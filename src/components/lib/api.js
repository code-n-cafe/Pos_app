let isRefreshing = false;

async function refreshToken() {
    if (isRefreshing) return;
    isRefreshing = true;
    
    try {
        const response = await fetch('/api/customers/refresh-token', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('authToken', data.token);
            return data.token;
        }
    } finally {
        isRefreshing = false;
    }
}

export async function authFetch(url, options) {
    let response = await fetch(url, options);
    
    // If unauthorized, try refreshing token
    if (response.status === 401) {
        const newToken = await refreshToken();
        if (newToken) {
            const newOptions = {
                ...options,
                headers: {
                    ...options.headers,
                    'Authorization': `Bearer ${newToken}`
                }
            };
            response = await fetch(url, newOptions);
        }
    }
    
    return response;
}
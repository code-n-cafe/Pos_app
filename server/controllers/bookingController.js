import Ticket from '../models/bookingModel.js';
import errorHandler from './errorController.js';

const createTicket = async (req, res) => {
  const ticket = new Ticket(req.body);
  try {
    await ticket.save();
    return res.status(200).json({
      message: 'Successfully created booking ticket!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const listTickets = async (req, res) => {
    try {
        let tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        });
    }
}

const ticketByID = async (req, res, next, id) => {
    try {
            let ticket = await Ticket.findById(id) 
            if (!ticket)
                return res.status('404').json({ 
                    error: "Ticket not created."
                })
            req.profile = ticket
            next()
        } catch (err) {
            return res.status('400').json({ 
                error: "Could not retrieve ticket"
            }) 
        }
    }
    
    const updateTicket = async (req, res) => { 
        try {
                    const ticket = await Ticket.findByIdAndUpdate(
                    req.params.bookingId,
                    req.body,
                    { new: true, runValidators: true }
                    );
                    if (!ticket) {
                        return res.status(404).json({ error: "Ticket not found" });
                    }
            
                    res.json(ticket); // Return the updated ticket
                } catch (err) {
                    console.error('Error updating ticket:', err); // Log the error for debugging
                    return res.status(400).json({ error: "Could not update ticket" });
                }
            };
    
    const removeTicket = async (req, res) => { 
        try {
            let ticket = req.profile
            let deletedTicket = await ticket.deleteOne() 
            res.json(deletedTicket) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
    const removeAllBooking = async (req, res) => {
        try {
            await Ticket.deleteMany({})
            res.status(200).json({
                message: "All Tickets removed"
            })
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    }
    
    export default { createTicket, ticketByID, listTickets, removeTicket, updateTicket, removeAllBooking }
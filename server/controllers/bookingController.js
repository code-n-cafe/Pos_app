import Ticket from '../models/bookingModel.js';
import errorHandler from './errorController.js';

const createTicket = async (req, res) => {
    console.log(req.body);
    const ticket = new Ticket(req.body);
    try {
      const { name, check_in, check_out, email, phone, group, numberOfPeople } = ticket;
      const finalData = {
        name,
        check_in,
        check_out,
        email,
        phone,
        group,
        numberOfPeople: group ? numberOfPeople : 1,
    };
      const newTicket = new Ticket(finalData);
      await newTicket.save();
  
      res.status(201).json({ message: 'Ticket created successfully!', ticket : newTicket });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create ticket' });
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

const ticketByEmailOrPhone = async (req, res) => {
  const email = (req.body.email || "").trim();
  const phone = (req.body.phone || "").replace(/\D/g, "");

  if (!email && !phone) return res.status(400).json({ error: "Provide email or phone" });
  if (email && phone) return res.status(400).json({ error: "Provide only one: email OR phone" });

  try {
    const query = email ? { email } : { phone };
    const ticket = await Ticket.findOne(query);

    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    return res.json({ booking: ticket });
  } catch (err) {
    return res.status(400).json({ error: errorHandler.getErrorMessage(err) });
  }
};

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
    
    export default { createTicket, ticketByEmailOrPhone, listTickets, removeTicket, updateTicket, removeAllBooking }
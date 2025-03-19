import Booking from '../models/bookingModel.js';
import errorHandler from './errorController.js';

const createTicket = async (req, res) => {
  const ticket = new Ticket(req.body);
  try {
    await ticket.save();
    return res.status(200).json({
      message: 'Successfully created customer!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
}

const listTickets = async (req, res) => {
    try {
        let tickets = await Ticket.find().select('name email updated created');
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
            let ticket = req.profile
            ticket = extend(user, req.body) 
            ticket.updated = Date.now() 
            await ticket.save()
            res.json(ticket) 
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err) 
            })
        } 
    }
    
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
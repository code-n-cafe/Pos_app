import express from 'express'
import bookingController from '../controllers/bookingController.js'

const bookingRouter = express.Router()

bookingRouter.route('/api/booking')
    .get(bookingController.listTickets)
    .post(bookingController.createTicket)
    .delete(bookingController.removeAllBooking)

bookingRouter.route('/api/users/:bookingId')
    .get(bookingController.ticketByID)
    .put(bookingController.updateTicket)
    .delete(bookingController.removeTicket)

bookingRouter.param('bookingId', bookingController.ticketByID)

export default bookingRouter
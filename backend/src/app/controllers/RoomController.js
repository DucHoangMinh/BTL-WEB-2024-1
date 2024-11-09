const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class RoomController {
  // Lấy danh sách tất cả các phòng chiếu
  getAllRooms = async (req, res) => {
    try {
      const rooms = await prisma.room.findMany({
        include: {
          MovieTheater: true,
          Seat: false,          
          Showtime: true      
        }
      });
      return res.status(200).json(rooms);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };


  getRoomById = async (req, res) => {
    const { id } = req.params;
    try {
      const room = await prisma.room.findUnique({
        where: { id: parseInt(id) },
        include: {
          MovieTheater: true,  
          Seat: true,          
          Showtime: true      
        }
      });

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      return res.status(200).json(room);
    } catch (error) {
      console.error('Error fetching room:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  // Tạo một phòng chiếu mới
  // createRoom = async (req, res) => {
  //   const { name, capacity, movie_theater_id } = req.body;

  //   if (!name || !capacity || !movie_theater_id) {
  //     return res.status(400).json({ message: 'All fields are required' });
  //   }

  //   try {
  //     const newRoom = await prisma.room.create({
  //       data: {
  //         name,
  //         capacity,
  //         movie_theater_id
  //       }
  //     });

  //     return res.status(201).json(newRoom);
  //   } catch (error) {
  //     console.error('Error creating room:', error);
  //     return res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // };

  //createRoom với mảng để tạo yêu cầu post cho nhanh
  createRoom = async (req, res) => {
    const rooms = req.body.rooms; 
  
    if (!rooms || rooms.length === 0) {
      return res.status(400).json({ message: 'Array of rooms is required' });
    }
  
    
    for (let room of rooms) {
      const { name, capacity, movie_theater_id } = room;
      if (!name || !capacity || !movie_theater_id) {
        return res.status(400).json({ message: 'Each room must have a name, capacity, and movie_theater_id' });
      }
    }
  
    try {
      const newRooms = await prisma.room.createMany({
        data: rooms
      });
  
      return res.status(201).json({
        message: `${newRooms.count} rooms created successfully`,
        newRooms
      });
    } catch (error) {
      console.error('Error creating rooms:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  


  updateRoom = async (req, res) => {
    const { id } = req.params;
    const { name, capacity, movie_theater_id } = req.body;

    try {
      const updatedRoom = await prisma.room.update({
        where: { id: parseInt(id) },
        data: {
          name,
          capacity,
          movie_theater_id
        }
      });

      return res.status(200).json(updatedRoom);
    } catch (error) {
      console.error('Error updating room:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  
  deleteRoom = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedRoom = await prisma.room.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({
        message: 'Room deleted successfully',
        deletedRoom
      });
    } catch (error) {
      console.error('Error deleting room:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}

module.exports = new RoomController();

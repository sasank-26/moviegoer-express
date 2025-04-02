
import React from 'react';
import { Seat } from '../lib/data';
import { useBooking } from '../context/BookingContext';

interface SeatSelectionProps {
  seats: Seat[];
  rowsPerSection?: number;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ seats, rowsPerSection = 5 }) => {
  const { bookingInfo, addSeat, removeSeat } = useBooking();
  
  // Get unique rows in order
  const rows = Array.from(new Set(seats.map(seat => seat.row))).sort();
  
  // Group seats by row
  const seatsByRow: Record<string, Seat[]> = {};
  rows.forEach(row => {
    seatsByRow[row] = seats
      .filter(seat => seat.row === row)
      .sort((a, b) => a.number - b.number);
  });

  // Divide rows into sections
  const sections: string[][] = [];
  for (let i = 0; i < rows.length; i += rowsPerSection) {
    sections.push(rows.slice(i, i + rowsPerSection));
  }

  const handleSeatClick = (seat: Seat) => {
    const isSelected = bookingInfo.seats.some(s => s.id === seat.id);
    
    if (isSelected) {
      removeSeat(seat.id);
    } else {
      addSeat(seat);
    }
  };

  const getSeatStatus = (seat: Seat): 'available' | 'selected' | 'booked' => {
    const isSelected = bookingInfo.seats.some(s => s.id === seat.id);
    if (isSelected) return 'selected';
    return seat.status;
  };

  return (
    <div className="w-full overflow-x-auto pb-6">
      <div className="mb-8 flex flex-col items-center">
        <div className="screen"></div>
        <div className="text-sm text-netflix-white/70 mt-1">Screen</div>
      </div>

      {sections.map((sectionRows, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          {sectionRows.map(row => (
            <div key={row} className="flex justify-center mb-2">
              <div className="w-6 flex items-center justify-center font-bold text-netflix-white/80">
                {row}
              </div>
              <div className="flex flex-wrap justify-center">
                {seatsByRow[row].map(seat => {
                  const status = getSeatStatus(seat);
                  return (
                    <button
                      key={seat.id}
                      className={`seat ${
                        status === 'available'
                          ? 'seat-available'
                          : status === 'selected'
                          ? 'seat-selected'
                          : 'seat-booked'
                      }`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={status === 'booked'}
                      title={`${row}${seat.number} - $${seat.price.toFixed(2)}`}
                    >
                      <span className="text-xs">{seat.number}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-netflix-light-gray rounded-t-md mr-2"></div>
          <span className="text-sm text-netflix-white">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-netflix-red rounded-t-md mr-2"></div>
          <span className="text-sm text-netflix-white">Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-netflix-gray rounded-t-md mr-2"></div>
          <span className="text-sm text-netflix-white">Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;

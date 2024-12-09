using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using proj2_tutorialPL.Models;

namespace proj2_tutorialPL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RentController : ControllerBase
    {
        private readonly DbTestContext _context;

        public RentController(DbTestContext context)
        {
            _context = context;
        }

        // GET: api/rent/user?userSub={userSub}
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<Rent>>> GetRentsByUserSub([FromQuery] string userSub)
        {
            if (string.IsNullOrEmpty(userSub))
            {
                return BadRequest(new { error = "UserSub is required." });
            }

            var userRents = await _context.Rents
                .Include(r => r.Driver)
                .Include(r => r.Product)
                .Where(r => r.UserSub == userSub)
                .ToListAsync();

            if (!userRents.Any())
            {
                return NotFound(new { error = "No rents found for the specified user." });
            }

            return Ok(userRents);
        }

        // POST: api/rent
        [HttpPost]
        public async Task<IActionResult> CreateRent([FromBody] Rent rent)
        {
            if (rent == null)
            {
                return BadRequest(new { error = "Rent data is null." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (rent.DriverId <= 0 || rent.ProductId <= 0)
            {
                return BadRequest(new { error = "DriverId and ProductId must be greater than zero." });
            }

            if (string.IsNullOrEmpty(rent.UserSub))
            {
                return BadRequest(new { error = "UserSub is required." });
            }

            try
            {
                _context.Rents.Add(rent);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetRent), new { id = rent.Id }, rent);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new { error = $"An error occurred while saving rent: {ex.Message}" });
            }
        }

        // GET: api/rent/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRent(int id)
        {
            var rent = await _context.Rents
                .Include(r => r.Driver)
                .Include(r => r.Product)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (rent == null)
            {
                return NotFound(new { error = "Rent not found." });
            }

            return Ok(rent);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRents()
        {
            var rents = await _context.Rents
                .Include(r => r.Driver)
                .Include(r => r.Product)
                .ToListAsync();

            return Ok(rents);
        }

        // PUT: api/rent/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRent(int id, [FromBody] Rent rent)
        {
            if (id != rent.Id)
            {
                return BadRequest(new { error = "Rent ID mismatch." });
            }

            _context.Entry(rent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Rents.Any(e => e.Id == id))
                {
                    return NotFound(new { error = "Rent not found." });
                }
                else
                {
                    throw;
                }
            }
        }
        // PUT: api/rent/{rentId}/update-status
        [HttpPut("{rentId}/update-status")]
        public async Task<IActionResult> UpdateRentStatus(int rentId, [FromBody] UpdateStatusRequest request)
        {
            var rent = await _context.Rents.FirstOrDefaultAsync(r => r.Id == rentId);

            if (rent == null)
            {
                return NotFound("Rent not found.");
            }

            rent.Status = request.Status;
            _context.Rents.Update(rent);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Rent status updated successfully." });
        }


        public class UpdateStatusRequest
        {
            public string Status { get; set; }
        }
        // DELETE: api/rent/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRent(int id)
        {
            var rent = await _context.Rents.FindAsync(id);
            if (rent == null)
            {
                return NotFound(new { error = "Rent not found." });
            }

            _context.Rents.Remove(rent);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

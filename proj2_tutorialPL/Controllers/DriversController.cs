using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using proj2_tutorialPL.Models;
using System;
using System.Threading.Tasks;

namespace proj2_tutorialPL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DriversController : ControllerBase
    {
        private readonly DbTestContext _context;
        private readonly ILogger<DriversController> _logger;

        public DriversController(DbTestContext context, ILogger<DriversController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // POST: api/drivers
        [HttpPost]
        public async Task<IActionResult> AddDriver([FromBody] Driver driver)
        {
            if (driver == null)
            {
                _logger.LogError("Driver object is null.");
                return BadRequest(new { message = "Driver data cannot be null." });
            }

            if (!ModelState.IsValid)
            {
                _logger.LogError("Invalid ModelState: {@ModelState}", ModelState);

                // Return detailed validation errors
                return BadRequest(new
                {
                    message = "Validation errors occurred.",
                    errors = ModelState
                });
            }

            try
            {
                // Add driver to the database
                _context.Drivers.Add(driver);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Driver successfully added with ID: {Id}", driver.Id);

                // Return Created response with driver data
                return CreatedAtAction(nameof(GetDriverById), new { id = driver.Id }, driver);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while adding the driver.");
                return StatusCode(500, new { message = "An error occurred while adding the driver. Please try again later." });
            }
        }

        // GET: api/drivers/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDriverById(int id)
        {
            try
            {
                var driver = await _context.Drivers.FindAsync(id);

                if (driver == null)
                {
                    _logger.LogWarning("Driver with ID: {Id} not found.", id);
                    return NotFound(new { message = $"Driver with ID {id} not found." });
                }

                _logger.LogInformation("Driver with ID: {Id} retrieved successfully.", id);
                return Ok(driver);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving the driver with ID: {Id}.", id);
                return StatusCode(500, new { message = "An error occurred while retrieving the driver. Please try again later." });
            }
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/plants")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly PlantContext _context;

        public PlantController(PlantContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Plant>>> GetPlants()
        {
            return await _context.Plants.ToArrayAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id)
        {
            try {
                var plant = await _context.Plants.Where(x => x.Id == id).Select(c => c).FirstOrDefaultAsync();
                _context.Entry(plant).State = EntityState.Modified;
                plant.LastWatered = DateTime.Now.ToString();
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                //double check to see if plant exists, otherwise return the error
                if (!PlantExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool PlantExists(int id)
        {
            return _context.Plants.Any(e => e.Id == id);
        }
    }
}

using System;
using System.Collections.Generic;

#nullable disable

namespace api.Models
{
    public partial class Plant
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string LastWatered { get; set; }
    }
}

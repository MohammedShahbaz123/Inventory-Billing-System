const dropArrow=document.getElementById('drop-arrow');

dropArrow.onclick=function(){
    dropArrow.classList.toggle('d-a')
    dropArrow.classList.toggle('drop-down-onclick');
    noHover();
}
function noHover(){
    const noHovers=document.getElementById('Sales-dropdown');
    noHovers.classList.toggle('hover')
    noHovers.classList.toggle('no-hover')
}
function businessDropDown(){
    const switchBusinessOption=document.getElementById('switch-business-id')
    switchBusinessOption.classList.toggle('business-drop-down-active');
}

// Make business option active
function selectBusinees(){
    const options = document.querySelectorAll('.business-option');
  
  // Load saved selection from localStorage
  const savedValue = localStorage.getItem('selectedBusiness');
  
  // Apply saved selection if it exists
  if (savedValue) {
    const savedInput = document.querySelector(`input[value="${savedValue}"]`);
    if (savedInput) {
      savedInput.checked = true;
      savedInput.closest('.business-option').classList.add('Business-active');
    }
  }
  
  // Set up click handlers for all options
  options.forEach(option => {
    option.addEventListener('click', function() {
      // Remove active class from all options
      options.forEach(opt => opt.classList.remove('Business-active'));
      
      // Get the radio input inside this label
      const radio = this.querySelector('input[type="radio"]');
      
      // Mark as selected and save to storage
      if (radio) {
        this.classList.add('Business-active');
        radio.checked = true;
        localStorage.setItem('selectedBusiness', radio.value);
      }
    });
    
    // Also trigger click when radio button is clicked directly
    const radio = option.querySelector('input[type="radio"]');
    if (radio) {
      radio.addEventListener('click', function() {
        option.click(); // Trigger the label click handler
      });
    }
  });
  }

// Content Load at page load
document.addEventListener('DOMContentLoaded', function() {
  selectBusinees();
  updateAndSaveDateTime();

  // Every 60sec it loads
  setInterval(()=>{
    updateAndSaveDateTime();
  },3600000);
  selectDay();
});

// Get elements
const todayDate = document.querySelector('.today-date');
const updateTime = document.querySelector('.update-time');
const refresh = document.querySelector('.refresh');

// Add click event to refersh button
function updateAndSaveDateTime(){
  const now=new Date();

  const start=new Date();
  start.setDate(now.getDate()-6);
  
  const optionsDate={day:'2-digit',month:'short',year:'numeric'};
  const formattedDate=now.toLocaleDateString('en-US',optionsDate).replace(/(\w+) (\d+),? (\d+)/,'$2 $1 $3');
  const startDate=start.toLocaleDateString('en-US',optionsDate).replace(/(\w+) (\d+),? (\d+)/,'$2 $1 $3');
  
    const optionstime={hour:'2-digit',minute:'2-digit',hour12:true};
    const formattedTime=now.toLocaleTimeString('en-US',optionstime);

    todayDate.firstChild.textContent=`${formattedDate} | `;
    updateTime.textContent=`${formattedTime}`;
    return {startDate,formattedDate};
}

  refresh.addEventListener('click',function(){
  updateAndSaveDateTime();
    const icon=this.querySelector('i'); 
    icon.style.transition='transform 3s ease';
    icon.style.transform='rotate(360deg)';
     
  setTimeout(()=>{
    icon.style.transform='rotate(0deg)';
  },300);
  });

  // Create Chart
  function createChart(){
  const { startDate, formattedDate } = updateAndSaveDateTime();
  document.querySelector('.sale-report-chart')
  .innerHTML=`
  <h4>Sales Report - <span class="week"> ${startDate} to ${formattedDate}</span></h4>
  <div class="saleChart-value">
  <canvas id="salesChart"></canvas>
  <div class="dayWise">
    <div class="custom-select">
  <div class="select-selected">Daily</div>
  <div class="select-items select-hide">
    <div class="selected-item">Daily</div>
    <div>Weekly</div>
  </div>
</div>
  <div class="valueHeader">
    Last 7 days sales
    <div class="value">₹1,67,835</div>
  </div>
  <div class="valueHeader">
    Invoice Made
    <div class="value">269</div>
  </div>
</div>
        </div>`

  // Sale Chart
  const ctx = document.getElementById('salesChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'],
    datasets: [{
      label: 'Sales',
      data: [30000, 0, 35000, 42000, 25000, 0, 10000],
      borderColor: 'green',
      backgroundColor: 'rgba(0, 128, 0, 0.3)',
      pointBackgroundColor: 'rgba(0, 128, 0, 0.3)',
      fill: true,
      tension: 0,
      pointHoverRadius: 8,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',    // respond to nearest point
      intersect: false,   // don’t require exact hover
      axis: 'xy'          // detect hover in both directions
    },
    hover: {
      mode: 'nearest',
      intersect: false,
      animationDuration: 0 // tooltip appears instantly
    },
    plugins: {
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        displayColors: false,
        usePointStyle: true,
        padding: 8,
        animation: {
          duration: 100  // quick fade-in/out
        },
        callbacks: {
          label: function(context) {
            return "Sales: " + (context.raw);
          }
        }
      },
      legend: {
        position: 'bottom',   // legend at bottom
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#333333',       // legend text color
          font: {
            size: 12.8,           
            weight: 'bold'
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60000,  
        ticks: {
          color: '#333333',
          font: {
            size: 12.8,
            weight: 'bold'
          },
          callback: function(value) {
            return value / 1000 + 'k';
          }
        }
      },
      x: {
        ticks: {
          color: '#333333',
          font: {
            size: 12.8,
            weight: 'bold'
          }
        }
      }
    }
  }
});
}


function selectDay(){
  createChart();
  const selected = document.querySelector(".select-selected");
  const items = document.querySelector(".select-items");

  selected.addEventListener("click", () => {
    items.classList.toggle("select-hide");
  });

  items.querySelectorAll("div").forEach(option => {
    option.addEventListener("click", function() {
       items.querySelectorAll("div").forEach(optn=>{
        optn.classList.remove('selected-item');
      });
      this.classList.add('selected-item');
      selected.textContent = option.textContent;
      items.classList.add("select-hide");
    });
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".custom-select")) {
      items.classList.add("select-hide");
    }
  });
}

// Inactive & Active Business
document.querySelectorAll(".menu-list li").forEach(item => {
      item.addEventListener("click", function(){

        // Reset all items (only one active at a time)
        document.querySelectorAll(".menu-list li").forEach(el => {
          el.setAttribute("data-active", "false");
          el.classList.remove('active-onclick');
        });

        item.setAttribute("data-active", "true");
        item.classList.add('active-onclick');
      });
    });

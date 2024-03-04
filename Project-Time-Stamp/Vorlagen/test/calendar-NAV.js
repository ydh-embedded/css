function Calendar () {
	this.month_names = [ "ERROR", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
	this.day_names = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

	this.year;						// current year displayed
	this.month;					// current month displayed	
	
	this.month_starts_on;	// what day of the week does the month start?
	
	/*** CALENDAR STUFF ***/
	this.show = function () {	
		 // display at top:  <MONTH NAME> <YEAR>
		$('#calendar-title').html(this.month_names[this.month] + ' ' + this.year);
		
		 // show dates in the day boxes
		var date = 0;
		for ( week = 1; week <= 5; ++week ) {			// for weeks 1 to 5 in the current month
			for ( day = 0; day < 7; ++day ) {					// for days 1 to 7 in week i
				if ( week == 1 && day < this.month_starts_on ) {
					$('#' + this.day_names[day].toLowerCase() + '-' + week + '-day').html('');
					continue;		// if before first of month, clear data
				}
				
				++date;
				if ( date > this.monthLength(this.month) ) {
					$('#' + this.day_names[day].toLowerCase() + '-' + week + '-day').html('');
					continue;			// once we're past the end of the month, clear data
				}
				
				$('#' + this.day_names[day].toLowerCase() + '-' + week + '-day').html(date);
			}
		}
	}
	
	/*** GETTERS & SETTERS ***/
	 // extract calendar vars (year, month, etc.) from a date value
	this.update = function (date) {
		var first_of_month;
		
		 // set the calendar's vars
		this.year		= date.getFullYear();
		this.month		= date.getMonth() + 1;		// January is 0!
		
		 // find what day the month starts on
		first_of_month = new Date(this.year, this.month - 1, 1,0,0,0,0);
		this.month_starts_on = first_of_month.getDay();							// getDay() returns numerical day (0=Sun, 1=Mon, etc)
	}
	
	 // initialize the calendar
	this.init = function () {
		 // initialize to the current month
		var current_time = new Date();
		
		this.update(current_time);
	}
	
	 // go to next month
	this.nextMonth = function () {
		var date = new Date(this.year, this.month, 1);		// next month (remember, 0 is Jan and this.month is 1-based)
		
		 //extract data from date
		this.update(date);
		
		 // show the new data
		this.show();
	}
	
	 // go to previous month
	this.prevMonth = function () {
		var date = new Date(this.year, this.month-2, 1);		// next month (remember, 0 is Jan and this.month is 1-based)
		
		 //extract data from date
		this.update(date);
		
		 // show the new data
		this.show();
	}
	
	 // get the number of days in the month (30? 31? 28?)
		// this is done by getting the first day of next month and -1day
	this.monthLength = function (month) {
		var intermediate_date = new Date(this.year, month, 1);		// first of next month (remember -- Date() is 0-based)
		var date = new Date(intermediate_date - 1);
		
		console.dir(date.getDate());
		
		return date.getDate();
	}
}
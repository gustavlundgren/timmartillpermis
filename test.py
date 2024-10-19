import datetime

def count_seconds_to_target(times):
    # Current time
    now = datetime.datetime.now()

    # Define the target time (October 24th at 14:00 / 2 PM)
    target_date = datetime.datetime(year=now.year, month=10, day=24, hour=14, minute=0, second=0)

    # If today is past October 24th, adjust target to next year
    if now > target_date:
        target_date = target_date.replace(year=now.year + 1)

    total_seconds =( target_date-now).total_seconds()  # Initialize total seconds till date
    if times:
        for i in times:
            if i:
                #print(format_seconds( calculate_sleeping_seconds(i[0], i[1], i[2], i[3], target_date)))
                total_seconds -= calculate_sleeping_seconds(i[0], i[1], i[2], i[3] , target_date)

    return total_seconds
import datetime

def calculate_sleeping_seconds(a_hour, a_minute, b_hour, b_minute, end_date):
    # Get the current time
    now = datetime.datetime.now()
    
    # Calculate the start and end of the sleep period
    sleep_start = datetime.time(a_hour, a_minute)
    sleep_end = datetime.time(b_hour, b_minute)
    
    # If the end time is before the start time, it means they sleep past midnight.
    if sleep_start > sleep_end:
        sleep_start_today = datetime.datetime.combine(now.date(), sleep_start)
        sleep_end_today = datetime.datetime.combine(now.date(), sleep_end) + datetime.timedelta(days=1)
    else:
        sleep_start_today = datetime.datetime.combine(now.date(), sleep_start)
        sleep_end_today = datetime.datetime.combine(now.date(), sleep_end)
    
    sleeping_seconds = 0
    total_days = (end_date - now).days
    
    # Add sleep time for the current day
    if now < sleep_start_today:
        # Sleeping starts later today
        sleeping_seconds += (sleep_end_today - sleep_start_today).total_seconds()
    elif now > sleep_end_today:
        # Sleep for the current day is already over
        pass
    else:
        # We're in the sleep period today
        sleeping_seconds += (sleep_end_today - now).total_seconds()
    
    # Add sleep time for the full days between now and the end date
    #print(format_seconds(sleeping_seconds))
    sleep_duration_per_day = (sleep_end_today - sleep_start_today).total_seconds()
   # print(format_seconds(sleep_duration_per_day))
    sleeping_seconds += total_days * sleep_duration_per_day
    sleep_start_today += datetime.timedelta(days=total_days+1)
    sleep_end_today += datetime.timedelta(days=total_days+1)
    #print(format_seconds(sleeping_seconds))
    # Add sleep time for the last partial day (if any)
    #print(sleep_start_today)
    if sleep_start_today < end_date:
        if now < sleep_start_today:
            sleeping_seconds += (sleep_end_today - sleep_start_today).total_seconds()
        elif now > sleep_end_today:
            sleeping_seconds += (end_date - sleep_start_today).total_seconds()
        else:
            sleeping_seconds += (end_date - now).total_seconds()
        #print(format_seconds(sleeping_seconds))
    return sleeping_seconds




def format_seconds(seconds):
    """Converts total seconds into hours, minutes, and seconds format."""
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    seconds = int(seconds % 60)
    return f"{hours} hours, {minutes} minutes, and {seconds} seconds"

print()

'''
# Example usage:
# Call with excluding sleeping hours
total_seconds = count_seconds_to_target([[]])
formatted_time = format_seconds(total_seconds)
print(f"Time remaining until October 24th, 14:00 (excluding sleeping hours): {formatted_time}")

# Call without excluding sleeping hours
total_seconds = count_seconds_to_target([[22,0,5,40]])
formatted_time = format_seconds(total_seconds)
print(f"Time remaining until October 24th, 14:00 (including sleeping hours): {formatted_time}")
'''
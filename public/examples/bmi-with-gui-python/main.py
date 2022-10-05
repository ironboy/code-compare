# Import Tkinter and its submodules (Tkinter: a GUI-module for Python)
import tkinter as tk
from tkinter.ttk import Label, Entry, Button
# Import or own functions that make creating windows easier + styling
from window_handling import create_window, start_window_loop
from style import setStyle

# Function for calculating BMI (as a lambda)
calculate_BMI = lambda lengthInCm, weigthInKg:\
  round(weigthInKg / ((lengthInCm / 100) ** 2), 1)

# Function for assessing BMI (as a lambda)
assess_BMI = lambda bmi: 'You are ' + (
  'big and beautiful' if bmi > 30.0 else
  'solidly built' if bmi > 25.0 else
  'of medium weight' if bmi >= 18.5 else 'easily carried'
) + '.'

# Function to run when clicking the calculate button:
# get the values of input fields, calculate and show result
def calculate() :
  global widgets
  try :
    result =  calculate_BMI(
      float(widgets['cm'].get()),
      float(widgets['kg'].get())
    )
  except: result = 'hard to calculate.'
  widgets['result'].config(text = 'Your BMI is ' + str(result))
  widgets['assessment'].config(text = '' 
    if 'hard' in str(result) else assess_BMI(result))

# Create GUI: Create a window + add styling + define widgets
win = create_window(tk, 'BMI Calculator (Python)', 75, 30)
setStyle(win)
health_icon_image = tk.PhotoImage(file = 'health-icon.png')
widgets = {
  'space': Label(win, text = ''),
  'healthIcon': Label(win, image = health_icon_image),
  'headline': Label(win, text = 'BMI Calculator', style = 'Heading.TLabel'),
  'length-label': Label(win, text = 'Your length in centimeters:'),
  'cm': Entry(win, width = 5),
  'weigth-label': Label(win, text='Your weight in kilograms:'),
  'kg': Entry(win, width = 5),
  'calculate': Button(win, text = 'Calculate your BMI', command = calculate),
  'result': Label(win, style = 'Result.TLabel'),
  'assessment': Label(win, style = 'Result.TLabel')
}
# Add widgets to window
for key in widgets: widgets[key].pack(pady = 10)

# Focus first input element and start the window loop
widgets['cm'].focus()
start_window_loop(win)
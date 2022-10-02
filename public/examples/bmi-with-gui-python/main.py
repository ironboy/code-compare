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
assess_BMI = lambda bmi: 'Du är ' + (
  'fet' if bmi > 30.0 else
  'överviktig' if bmi > 25.0 else
  'normalviktig' if bmi >= 18.5 else 'underviktig'
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
  except: result = 'svår att räkna ut.'
  widgets['result'].config(text = 'Din BMI är ' + str(result))
  widgets['assessment'].config(text = '' 
    if 'svår' in str(result) else assess_BMI(result))

# Create GUI: Create a window + add styling + define widgets
win = create_window(tk, 'BMI-kalkylatorn (Python)', 75, 30)
setStyle(win)
health_icon_image = tk.PhotoImage(file = 'health-icon.png')
widgets = {
  'space': Label(win, text = ''),
  'healthIcon': Label(win, image = health_icon_image),
  'headline': Label(win, text = 'BMI-kalkylatorn', style = 'Heading.TLabel'),
  'length-label': Label(win, text = 'Din längd i cm:'),
  'cm': Entry(win, width = 5),
  'weigth-label': Label(win, text='Din vikt i kg:'),
  'kg': Entry(win, width = 5),
  'calculate': Button(win, text = 'Räkna ut din BMI', command = calculate),
  'result': Label(win, style = 'Result.TLabel'),
  'assessment': Label(win, style = 'Result.TLabel')
}
# Add widgets to window
for key in widgets: widgets[key].pack(pady = 10)

# Focus first input element and start the window loop
widgets['cm'].focus()
start_window_loop(win)
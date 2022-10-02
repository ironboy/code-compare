from tkinter.ttk import Style

# Tkinter will let you define styles for widgets
# in a way semi-similar to how CSS styling works
def setStyle(win):

    win.configure(
      background = "#1f498c"
    )

    style = Style()
    
    style.theme_use('classic')
    
    style.configure(
      'TLabel', 
      background = '#1f498c', 
      foreground = '#eee'
    )

    style.configure(
      'TButton', 
      background = '#84b0f5', 
      foreground = 'black',
      borderwidth = 0, 
      focusthickness = 0, 
      focuscolor = 'none'
    )

    style.configure(
      'Heading.TLabel',
      font = (
        'TkDefaultFont',
        24
      )
    )

    style.configure(
      'Result.TLabel', 
      font = (
        'TkDefaultFont',
        18
      )
    )
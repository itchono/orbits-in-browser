// Script to run contents of orbit_display.py using Pyodide
script_contents = `
import matplotlib
import numpy as np
matplotlib.use("module://matplotlib.backends.html5_canvas_backend")
from matplotlib import pyplot as plt
from matplotlib.patches import Circle

# Create a figure
fig, ax = plt.subplots()

# Plot the orbit
circle = Circle((0, 0), 1, color='b', fill=False)
ax.add_patch(circle)

ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.5, 1.5)
ax.set_aspect('equal')

plt.show()
`

// Load and run Pyodide
async function main() {
    let pyodide = await loadPyodide();
    console.log(
        pyodide.runPython(`
        import sys
        sys.version
    `)
    );
    await pyodide.loadPackage("matplotlib");
    pyodide.runPython(script_contents);
    document.getElementById("msg").innerText = "Plot is ready!"
}
main();


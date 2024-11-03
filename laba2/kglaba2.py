import numpy as np
import matplotlib.pyplot as plt

width, height = 800, 800
xmin, xmax, ymin, ymax = -2.2, 1.0, -1.2, 1.2
max_iter = 100


def mandelbrot(c, max_iter):
    z = 0
    n = 0
    while abs(z) <= 2 and n < max_iter:
        z = z*z + c
        n += 1
    return n

x = np.linspace(xmin, xmax, width)
y = np.linspace(ymin, ymax, height)
X, Y = np.meshgrid(x, y)
C = X + 1j * Y

mandelbrot_set = np.zeros(C.shape, dtype=int)


for i in range(width):
    for j in range(height):
        mandelbrot_set[j, i] = mandelbrot(C[j, i], max_iter)

plt.imshow(mandelbrot_set, extent=[xmin, xmax, ymin, ymax], cmap='hot')
plt.colorbar()
plt.title("Фрактал Мандельброта")
plt.show()

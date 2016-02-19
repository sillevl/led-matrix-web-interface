var pngparse = require("pngparse");
var PNG = require('node-png').PNG;
var Readable = require('stream').Readable;
var origin_base = "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";
var origin = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAABS39xVAAAPVElEQVR4Xu2ce6h8VRWAP9FMUxE1BBPUf0JEUqSw8IFJPgo1FM23kSgpKqiFopZmig8MX5imZvhWxNIkpNJCM41MRbRCRckMTKRSSsw3xop9YHOYuffOuXPn/tbd38APdO6Zc9b61p6PvfdZZ1YDPsSXBCQggQQEVlNYCapkiBKQwP8JKCwHggQkkIaAwkpTKgOVgAQUlmNAAhJIQ0BhpSmVgUpAAgrLMSABCaQhoLDSlMpAJSABheUYkIAE0hBQWGlKZaASkIDCcgxIQAJpCCisNKUyUAlIQGE5BiQggTQEFFaaUhmoBCSgsBwDEpBAGgIKK02pDFQCElBYjgEJSCANAYWVplQGKgEJKCzHgAQkkIaAwkpTKgOVgAQUlmNAAhJIQ0BhpSmVgUpAAgrLMSABCaQhoLDSlMpAJSABheUYkIAE0hBQWGlKZaASkIDCcgxIQAJpCCisNKUyUAlIYEJhbQTcCuwJnAWcu0wEzwTOAa4BTgbeKnHU8R1eYl2mEL2sBCQwdQIKa pIPaEEJLBUBBTWUpH1vBKQwNQJKKypI/WEEpDAUhFQWEtF1vNKQAJTJ6Cwpo7UE0pAAktFYJHCOg/YGTgK2AvYEHgSuAu4CfjbPHHHXb39gf2AHYH1yufvBX4E/HXM5xd7l3Bj4EBgX2D73nVvA54FPlwq5p5XAhIYSGARwroEeBs4Y8ylnwO Djw04u9x2WiNuAzYcsznXwO DfwQeL93zFBhrVFEdT6w ZjrvgFcBFxctUsMpOvHJCCBqRJYhLC6OG4HrgX DKwLHAScUmZbvwK CrzSC3oX4MYijRDblcDdwDvANsBJwN5AyONYIK5Rz3iGCCtSPQS4usyoHgOuAB4A3gO2A44v141wLwTOLjFNlbknk4AEBhJYpLBidhUzrRBN94pTHl0kFu/tAdxf/X2TslzcDXgUOBJ4phf 2sCpRRjxt4OBp6tjhghra BOYCvgHuAY4NXeddcpM8bIK2R5RDl2IF0/JgEJTJXAIoQ1bvYU8cUy7w5g2zJDio707nUYcEsRwgHAfWMS2hS4GdgVCEHFflk3y5pUWJFmdMTHMm UAOsQ6uveAJwAvDlV6J5MAhIYRmARwroUOA14d8SVxz3Cs2ZZaoU8QniHAv8YE/nq5dGf04HYhI/Zzuvl2EmFtT5wHRCC7D/OM ryEV/MHJ8qS9xYtvqSgASWm8AihDXXs4TjhLVBmTXFHcXry8wpNu7HveJO3lUjxDGpsGKDPe7 7bDAZyB3r2Z OwGPLHedvL4EJADMWFi1yCbhH5v2 wBPDJxh1UvUhTwUHS0WD5drKaxJKuWxElhKAkmEFQhqcUw6w1JYSzmIPLcEZkVgGYX1XSD DWnQnFRYLglnNaC8jgSWksCMhbVWuVN3XNnLir6naB Y9DWpsCbZdK/vKMYSNFoqXpg0QI XgASWgMCMhRUZxGM8cccu9qXi0Zg/jEnro6WVIfaTQhhxR/LlgXtYtYReKncLHx9z3bqtIdoqhkp1CarlKSXQOIFlENYWpQ8rRBTtCiGEkEj96nelxy bxvLxg4HCio/1G0fjup0Au2vbONr498H0V3ECyyCsvoyixyl6o34K/AcIocUyLDrR42Ho6IaPHqznK5STLgnjo3M9mtN/JCiOj3aK6La3aXQVH8OG1xCBZRBWJ49YDl4wx8PPcVx0wZ9Yfj2hrsoQYcXn4 Hn6LSPptD4ZYlRr9hTu7w0uCqrhr4LppqAwDIJqyPT/bxM9FhFU2dIJJaHMauKx2IeHPOLCUOF1V13szKLi cc z8vEw2tLw68e5mg4oYogcQEJhRW4kwNXQISSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIdCgsM4EzgGuAU4G3pqw2lsCdwDbAocDt074eQ XgASGElBYCmvo2PFzEpg5AYWlsGY 6LygBIYSUFgKa jY8XMSmDkBhaWwZj7ovKAEhhJQWApr6NjxcxKYOYEFCmt14FzgdODHwNHAv0cEuztwX3l/D D Ecd8GvhZeX8f4IneMRsDBwL7AtsD6wFPAvcCtwHPAh OOG939 8s4DLgm8DXyud/DVwB/BZYyF3CLYCjgL2A7YDngJ8AV5bzeZdw5iPVC0oAWKCwgtWXgXuA54EDgKd7AONU3ypiiz dAVwwAvIxwNXAL4AjgH WY9Yoojof2HxMcd4ALgIuHtGO0InoEmAt4LjqHPG5/YAQ11zCihgOA IcG46I4Sng 8AJtjX49ZHAMhCYQFjz9R tD1xXZBaZ3AwcD4QsutfawKVASCvEcV6ZLUUYhxSRxYzqsTIjegB4r8xy4lx7lxNdCJwNvFOduxNRvBXXjHNHj9RHgB3LDO31eYR1MHBtmUVFDCHc35Vz7F/6tmqZ2oe1DGPWSzZMYAJh1bIJ6ZwGvFuh26YsF0NccewfgUOBl6pjaunVS8atgTuBrcosLoT2aq8s65RZW8zcQkgxO4sZX/eqhRX/HVJ7f0Rpx82wNgFuAnabI4YdipQjzngprIa/O6a DAQmEFZE1y3nHixLp79XIcdS6pYiis8Bnwd2AR6qjumWlfXnI4ToOI9l3jNAzHL6y83uFJuWmduuwA1lafZm WMnoleAUXtjfbH1O9272OrlY78iEWvs38UsTGEtw3j1ko0TmFBY3Yb5ukDMkH5f8K1ZRBWyiQ3zWN7FHtI3yhIwDqs37usZWr2UXMjjMiG32GOK/aSDyoZ4nL8T1iiZ1lUeNcOqY vvrfVHSDeT/KQzrMa/PKY/ewITCuvjZYbzReDY8jxeBP2Jsl/0dlmqxXItpBJ7WicC/wXqz8Z 0F0l29gTirt/sdyKO3xxN3KuV30ncifgkd4M65dl9vevMScZJayPAZeX2dN80tyo5Lqnwpr9ePWKjROYUFj1ncD6ix2b2j8vd9BCCPH/vykb1t0 VnfMX3ozo/k28/sVivM8XN4cJaxakqOqO0pYtYRioz2O WDM0IibAtHeEFJ2D6vx74/pz5jAhMKK6LoZTtw962TULdNiSRg9St2s6VPAl8osqDumv/c0bWHNN0NarLDqmw8Ka8bj1cs1TmCAsOolXLePFTOO2Gjv rPqJVbsY8Wsp5uV1EvJoD/tJeEQYbkkbPx7YPpJCAwQVr XKtoRYlYVDaV1B3w3owqBRKNozKyii71/B2 STff6jmJ0yMeM7oXeHtYQYcV5v1P zbdpP mMMMlIMEwJJCAwQFiRVdfCEM2h8fhN9C/VjaBxTLdnFWKJY6KRc9RjPbWEomcrZmmPj0FXtzX0G1MX8shNnHbccV8A7i7X7fd41eF0ucd7LgkTjHFDXEEEBgqru7UfjZnxaM3Opc2hfnaw3seKX/WM2VVfah3JfuNodLW/3MO80MbRITOsuNQG5a7nV4BHgSNLX1gdRjSMXg98trypsFbQd8FUEhAYKKz Yzj1BnyXdb10jPeiIbPbgO TmevRnHj8JgR5UvVozlXAqUDXNDrXzKl/rblmYtHoemPZV4sHnr8HRJtEvKKN4RQgloTdS2ElGOOGuIIIDBRWvYwLGuNmNd0 Vhwz397QfA8ed9KLfql47KaW1bSEFXmFmOLXHmoxdRUP6cYNhM UWaXCWkHfBVNJQGCgsCKzbo8q pL6d/66zOtj5utv6j6zWdlMjzuQ/Z XieXYi/P8vMzQJWFdrejLim79EFIs/14rv/TwA BPpXnWxtEE49sQVxiBRQhrhZEwHQlIYJUnoLBW RIZoAQk0BFQWI4FCUggDQGFlaZUBioBCSgsx4AEJJCGgMJKUyoDlYAEFJZjQAISSENAYaUplYFKQAIKyzEgAQmkIaCw0pTKQCUgAYXlGJCABNIQUFhpSmWgEpCAwnIMSEACaQgorDSlMlAJSEBhOQYkIIE0BBRWmlIZqAQkoLAcAxKQQBoCCitNqQxUAhJQWI4BCUggDQGFlaZUBioBCSgsx4AEJJCGgMJKUyoDlYAEFJZjQAISSENAYaUplYFKQAIKyzEgAQmkIaCw0pTKQCUgAYXlGJCABNIQUFhpSmWgEpCAwnIMSEACaQgorDSlMlAJSEBhOQYkIIE0BBRWmlIZqAQkoLAcAxKQQBoCCitNqQxUAhJQWI4BCUggDQGFlaZUBioBCSgsx4AEJJCGgMJKUyoDlYAEFJZjQAISSENAYaUplYFKQAIKyzEgAQmkIaCw0pTKQCUgAYXlGJCABNIQUFhpSmWgEpCAwnIMSEACaQgorDSlMlAJSEBhOQYkIIE0BBRWmlIZqAQkoLAcAxKQQBoCCitNqQxUAhL4H3Q20y5IdpWSAAAAAElFTkSuQmCC:";
//var origin_base = "iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAABS39xVAAAPVElEQVR4Xu2ce6h8VRWAP9FMUxE1BBPUf0JEUqSw8IFJPgo1FM23kSgpKqiFopZmig8MX5imZvhWxNIkpNJCM41MRbRCRckMTKRSSsw3xop9YHOYuffOuXPn/tbd38APdO6Zc9b61p6PvfdZZ1YDPsSXBCQggQQEVlNYCapkiBKQwP8JKCwHggQkkIaAwkpTKgOVgAQUlmNAAhJIQ0BhpSmVgUpAAgrLMSABCaQhoLDSlMpAJSABheUYkIAE0hBQWGlKZaASkIDCcgxIQAJpCCisNKUyUAlIQGE5BiQggTQEFFaaUhmoBCSgsBwDEpBAGgIKK02pDFQCElBYjgEJSCANAYWVplQGKgEJKCzHgAQkkIaAwkpTKgOVgAQUlmNAAhJIQ0BhpSmVgUpAAgrLMSABCaQhoLDSlMpAJSABheUYkIAE0hBQWGlKZaASkIDCcgxIQAJpCCisNKUyUAlIYEJhbQTcCuwJnAWcu0wEzwTOAa4BTgbeKnHU8R1eYl2mEL2sBCQwdQIKa pIPaEEJLBUBBTWUpH1vBKQwNQJKKypI/WEEpDAUhFQWEtF1vNKQAJTJ6Cwpo7UE0pAAktFYJHCOg/YGTgK2AvYEHgSuAu4CfjbPHHHXb39gf2AHYH1yufvBX4E/HXM5xd7l3Bj4EBgX2D73nVvA54FPlwq5p5XAhIYSGARwroEeBs4Y8ylnwO Djw04u9x2WiNuAzYcsznXwO DfwQeL93zFBhrVFEdT6w ZjrvgFcBFxctUsMpOvHJCCBqRJYhLC6OG4HrgX DKwLHAScUmZbvwK CrzSC3oX4MYijRDblcDdwDvANsBJwN5AyONYIK5Rz3iGCCtSPQS4usyoHgOuAB4A3gO2A44v141wLwTOLjFNlbknk4AEBhJYpLBidhUzrRBN94pTHl0kFu/tAdxf/X2TslzcDXgUOBJ4phf 2sCpRRjxt4OBp6tjhghra BOYCvgHuAY4NXeddcpM8bIK2R5RDl2IF0/JgEJTJXAIoQ1bvYU8cUy7w5g2zJDio707nUYcEsRwgHAfWMS2hS4GdgVCEHFflk3y5pUWJFmdMTHMm UAOsQ6uveAJwAvDlV6J5MAhIYRmARwroUOA14d8SVxz3Cs2ZZaoU8QniHAv8YE/nq5dGf04HYhI/Zzuvl2EmFtT5wHRCC7D/OM ryEV/MHJ8qS9xYtvqSgASWm8AihDXXs4TjhLVBmTXFHcXry8wpNu7HveJO3lUjxDGpsGKDPe7 7bDAZyB3r2Z OwGPLHedvL4EJADMWFi1yCbhH5v2 wBPDJxh1UvUhTwUHS0WD5drKaxJKuWxElhKAkmEFQhqcUw6w1JYSzmIPLcEZkVgGYX1XSD DWnQnFRYLglnNaC8jgSWksCMhbVWuVN3XNnLir6naB Y9DWpsCbZdK/vKMYSNFoqXpg0QI XgASWgMCMhRUZxGM8cccu9qXi0Zg/jEnro6WVIfaTQhhxR/LlgXtYtYReKncLHx9z3bqtIdoqhkp1CarlKSXQOIFlENYWpQ8rRBTtCiGEkEj96nelxy bxvLxg4HCio/1G0fjup0Au2vbONr498H0V3ECyyCsvoyixyl6o34K/AcIocUyLDrR42Ho6IaPHqznK5STLgnjo3M9mtN/JCiOj3aK6La3aXQVH8OG1xCBZRBWJ49YDl4wx8PPcVx0wZ9Yfj2hrsoQYcXn4 Hn6LSPptD4ZYlRr9hTu7w0uCqrhr4LppqAwDIJqyPT/bxM9FhFU2dIJJaHMauKx2IeHPOLCUOF1V13szKLi cc z8vEw2tLw68e5mg4oYogcQEJhRW4kwNXQISSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIaCw2qm1mUogPQGFlb6EJiCBdggorHZqbaYSSE9AYaUvoQlIoB0CCqudWpupBNITUFjpS2gCEmiHgMJqp9ZmKoH0BBRW hKagATaIdCgsM4EzgGuAU4G3pqw2lsCdwDbAocDt074eQ XgASGElBYCmvo2PFzEpg5AYWlsGY 6LygBIYSUFgKa jY8XMSmDkBhaWwZj7ovKAEhhJQWApr6NjxcxKYOYEFCmt14FzgdODHwNHAv0cEuztwX3l/D D Ecd8GvhZeX8f4IneMRsDBwL7AtsD6wFPAvcCtwHPAh OOG939 8s4DLgm8DXyud/DVwB/BZYyF3CLYCjgL2A7YDngJ8AV5bzeZdw5iPVC0oAWKCwgtWXgXuA54EDgKd7AONU3ypiiz dAVwwAvIxwNXAL4AjgH WY9Yoojof2HxMcd4ALgIuHtGO0InoEmAt4LjqHPG5/YAQ11zCihgOA IcG46I4Sng 8AJtjX49ZHAMhCYQFjz9R tD1xXZBaZ3AwcD4QsutfawKVASCvEcV6ZLUUYhxSRxYzqsTIjegB4r8xy4lx7lxNdCJwNvFOduxNRvBXXjHNHj9RHgB3LDO31eYR1MHBtmUVFDCHc35Vz7F/6tmqZ2oe1DGPWSzZMYAJh1bIJ6ZwGvFuh26YsF0NccewfgUOBl6pjaunVS8atgTuBrcosLoT2aq8s65RZW8zcQkgxO4sZX/eqhRX/HVJ7f0Rpx82wNgFuAnabI4YdipQjzngprIa/O6a DAQmEFZE1y3nHixLp79XIcdS6pYiis8Bnwd2AR6qjumWlfXnI4ToOI9l3jNAzHL6y83uFJuWmduuwA1lafZm WMnoleAUXtjfbH1O9272OrlY78iEWvs38UsTGEtw3j1ko0TmFBY3Yb5ukDMkH5f8K1ZRBWyiQ3zWN7FHtI3yhIwDqs37usZWr2UXMjjMiG32GOK/aSDyoZ4nL8T1iiZ1lUeNcOqY vvrfVHSDeT/KQzrMa/PKY/ewITCuvjZYbzReDY8jxeBP2Jsl/0dlmqxXItpBJ7WicC/wXqz8Z 0F0l29gTirt/sdyKO3xxN3KuV30ncifgkd4M65dl9vevMScZJayPAZeX2dN80tyo5Lqnwpr9ePWKjROYUFj1ncD6ix2b2j8vd9BCCPH/vykb1t0 VnfMX3ozo/k28/sVivM8XN4cJaxakqOqO0pYtYRioz2O WDM0IibAtHeEFJ2D6vx74/pz5jAhMKK6LoZTtw962TULdNiSRg9St2s6VPAl8osqDumv/c0bWHNN0NarLDqmw8Ka8bj1cs1TmCAsOolXLePFTOO2Gjv rPqJVbsY8Wsp5uV1EvJoD/tJeEQYbkkbPx7YPpJCAwQVr XKtoRYlYVDaV1B3w3owqBRKNozKyii71/B2 STff6jmJ0yMeM7oXeHtYQYcV5v1P zbdpP mMMMlIMEwJJCAwQFiRVdfCEM2h8fhN9C/VjaBxTLdnFWKJY6KRc9RjPbWEomcrZmmPj0FXtzX0G1MX8shNnHbccV8A7i7X7fd41eF0ucd7LgkTjHFDXEEEBgqru7UfjZnxaM3Opc2hfnaw3seKX/WM2VVfah3JfuNodLW/3MO80MbRITOsuNQG5a7nV4BHgSNLX1gdRjSMXg98trypsFbQd8FUEhAYKKz Yzj1BnyXdb10jPeiIbPbgO TmevRnHj8JgR5UvVozlXAqUDXNDrXzKl/rblmYtHoemPZV4sHnr8HRJtEvKKN4RQgloTdS2ElGOOGuIIIDBRWvYwLGuNmNd0 Vhwz397QfA8ed9KLfql47KaW1bSEFXmFmOLXHmoxdRUP6cYNhM UWaXCWkHfBVNJQGCgsCKzbo8q pL6d/66zOtj5utv6j6zWdlMjzuQ/Z XieXYi/P8vMzQJWFdrejLim79EFIs/14rv/TwA BPpXnWxtEE49sQVxiBRQhrhZEwHQlIYJUnoLBW RIZoAQk0BFQWI4FCUggDQGFlaZUBioBCSgsx4AEJJCGgMJKUyoDlYAEFJZjQAISSENAYaUplYFKQAIKyzEgAQmkIaCw0pTKQCUgAYXlGJCABNIQUFhpSmWgEpCAwnIMSEACaQgorDSlMlAJSEBhOQYkIIE0BBRWmlIZqAQkoLAcAxKQQBoCCitNqQxUAhJQWI4BCUggDQGFlaZUBioBCSgsx4AEJJCGgMJKUyoDlYAEFJZjQAISSENAYaUplYFKQAIKyzEgAQmkIaCw0pTKQCUgAYXlGJCABNIQUFhpSmWgEpCAwnIMSEACaQgorDSlMlAJSEBhOQYkIIE0BBRWmlIZqAQkoLAcAxKQQBoCCitNqQxUAhJQWI4BCUggDQGFlaZUBioBCSgsx4AEJJCGgMJKUyoDlYAEFJZjQAISSENAYaUplYFKQAIKyzEgAQmkIaCw0pTKQCUgAYXlGJCABNIQUFhpSmWgEpCAwnIMSEACaQgorDSlMlAJSEBhOQYkIIE0BBRWmlIZqAQkoLAcAxKQQBoCCitNqQxUAhL4H3Q20y5IdpWSAAAAAElFTkSuQmCC";

var buf = new Buffer("89504e470d0a1a0a0000000d49484452000000100000001008000000003a98a0bd000000017352474200aece1ce90000002174455874536f6674776172650047726170686963436f6e7665727465722028496e74656c297787fa190000008849444154789c448e4111c020100363010b58c00216b080052c60010b58c0c259c00216ae4d3b69df99dd0d1062caa5b63ee6b27d1c012996dceae86b6ef38398106acb65ae3e8edbbef780564b5e73743fdb409e1ef2f4803c3de4e901797ac8d3f3f0f490a7077ffffd03f5f507eaeb0fd4d71fa8af3f505f7fa0befe7c7dfdb9000000ffff0300c0fd7f8179301408", "hex");
var image = new Buffer("89504e470d0a1a0a0000000d494844520000012c000000c8080600000052dfdc55000005cf49444154785eedd4010900000c02c1d9bff4723cdc12c839dc39020408440416c92926010204ce60790202043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b1315608488182c3f000040864060e56a52940081032587c8100808d82c0c954252a020307c80c10219010315a98a9042440c161fa000206320307295094a004081b2c3c40824044c16266a81095030183e4040810c80818ad4e5680102060b0fd0201011b018196a84a50000605070810c80818ac4c5582122060b0fc00010219018395a94a5002040c961f2040202360b03255094a8080c1f203040864040c56a62a41091030587e8000818c80c1ca542528010206cb0f10209011305899aa042540c060f90102043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b1315608488182c3f000040864060e56a52940081032587c8100808d82c0c954252a020307c80c10219010315a98a9042440c161fa000206320307295094a004081b2c3c40824044c16266a81095030183e4040810c80818ad4e5680102060b0fd0201011b018196a84a50000605070810c80818ac4c5582122060b0fc00010219018395a94a5002040c961f2040202360b03255094a8080c1f203040864040c56a62a41091030587e8000818c80c1ca542528010206cb0f10209011305899aa042540c060f90102043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b1315608488182c3f000040864060e56a52940081032587c8100808d82c0c954252a020307c80c10219010315a98a9042440c161fa000206320307295094a004081b2c3c40824044c16266a81095030183e4040810c80818ad4e5680102060b0fd0201011b018196a84a50000605070810c80818ac4c5582122060b0fc00010219018395a94a5002040c961f2040202360b03255094a8080c1f203040864040c56a62a41091030587e8000818c80c1ca542528010206cb0f10209011305899aa042540c060f90102043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b1315608488182c3f000040864060e56a52940081032587c8100808d82c0c954252a020307c80c10219010315a98a9042440c161fa000206320307295094a004081b2c3c40824044c16266a81095030183e4040810c80818ad4e5680102060b0fd0201011b018196a84a50000605070810c80818ac4c5582122060b0fc00010219018395a94a5002040c961f2040202360b03255094a8080c1f203040864040c56a62a41091030587e8000818c80c1ca542528010206cb0f10209011305899aa042540c060f90102043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b1315608488182c3f000040864060e56a52940081032587c8100808d82c0c954252a020307c80c10219010315a98a9042440c161fa000206320307295094a004081b2c3c40824044c16266a81095030183e4040810c80818ad4e5680102060b0fd0201011b018196a84a50000605070810c80818ac4c5582122060b0fc00010219018395a94a5002040c961f2040202360b03255094a8080c1f203040864040c56a62a41091030587e8000818c80c1ca542528010206cb0f10209011305899aa042540c060f90102043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b1315608488182c3f000040864060e56a52940081032587c8100808d82c0c954252a020307c80c10219010315a98a9042440c161fa000206320307295094a004081b2c3c40824044c16266a81095030183e4040810c80818ad4e5680102060b0fd0201011b018196a84a50000605070810c80818ac4c5582122060b0fc00010219018395a94a5002040c961f2040202360b03255094a8080c1f203040864040c56a62a41091030587e8000818c80c1ca542528010206cb0f10209011305899aa042540c060f90102043202062b5395a00408182c3f40804046c06065aa129400018141c2043202062b13156084883c0656003273979a1f40000000125153912b909820", "hex");

var buffer = new Buffer(origin_base, "base64");
//console.log(buffer.toString("binary"));

// pngparse.parseBuffer(buffer, function(err, data) {
//   if(err)
//     throw err
//
//     console.log("png ready")
//   console.log(data.data.toString('hex'));
//   /* do things! */
// })

//**************************************************

var png = new PNG({filterType: -1});

//console.log(image.toString('hex'));

var s = new Readable();
s.push(buffer);
s.push(null);

//s.pipe(process.stdout, { end : false });

png.on('parsed', function(){
  console.log("PNG parsed");
});

s.pipe(png);

//************************************
//
// var fs = require('fs');
// fs.writeFile("tmp.png", buf, function(err) {
//     if(err) {
//         return console.log(err);
//     }
//
//     console.log("The file was saved!");
// });

//******************************************

// pngparse.parseFile("download (1).png", function(err, data) {
//   if(err)
//     throw err
//
//     console.log("png ready");
//   /* do things! */
// })

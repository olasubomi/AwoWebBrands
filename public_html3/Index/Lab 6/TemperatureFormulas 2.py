# Olasubomi Awokoya
# CSE 3, Tuesdays 3pm

def convertFtoC():
    print("Fahrenheit to Celsius")
    print("\tC = (F-32) x 5/9)")

def convertCtoF():
        print("Celsius to Fahrenheit")
        print("\tF = (C x 9/5) + 32")

def convertCtoK():
    print("Celsius to Kelvin")
    print("\tK = C + 273.15")

tempUnit = input("What is temperature unit (C or F) you want to convert?")

if tempUnit == "C":
    newTempUnit = input("Do you want to convert to F or K?")

    if newTempUnit == "F":
        convertCtoF()
    elif newTempUnit == "K":
        convertCtoK()
elif tempUnit == "F":
    newTempUnit = input("Do you want to convert to C or K?")

    if newTempUnit == "C":
        convertFtoC()
    else:
        convertFtoC()
        convertCtoK()

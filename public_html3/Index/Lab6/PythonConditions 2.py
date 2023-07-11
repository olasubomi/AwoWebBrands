# Olasubomi Awokoya
# CSE 3, Thursday 3pm

favorite_pet = input("Do you like cats or dogs?")

if (favorite_pet == "dogs"):
    dogSize = input("Do you like small, medium, or big dogs?")

    if dogSize == "big":
        print("You might like Great Danes and Mastiffs!")
    elif dogSize == "medium":
        print("You might like Golden Retrievers and German Sheperds!")
    else:
        print("You might like Corgis and Dachshunds!")
elif (favorite_pet == "cats"):
    print ("All cats are great!")

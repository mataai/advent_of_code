import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from shared.base_module import load_input

real_data = load_input(__file__)

demo_data = """L68
L30
R48
L5
R60
L55
L1
L99
R14
L82"""

test_data = """R500
R350
L299"""


def part2(data):
    location = 50
    count = 0
    array = data.splitlines()

    for e in array:
        direct = e[0]
        movement = int(e[1:])
        distance = movement % 100
        count += movement // 100
        startLoc = location
        if movement == 0:
            print(f"{e} from {startLoc} to: {location} (total crossings: {count})")
            continue
        if direct == "R":
            if location + distance >= 100:
                location = 0 + (location + distance - 100)
                if location != 0:
                    count += 1
            else:
                location += distance
        elif direct == "L":
            if location - distance < 0:
                location = 100 - abs(location - distance)
                if location != 0 and startLoc != 0:
                    count += 1
            else:
                location -= distance
        if location == 0 or location == 100:
            count += 1

        print(f"{e} from {startLoc} to: {location} (total crossings: {count})")

    print(count)


def part1(data):
    location = 50
    count = 0
    array = data.splitlines()

    for e in array:
        direct = e[0]
        distance = int(e[1:]) % 100
        startLoc = location
        if direct == "R":
            if location + distance >= 100:
                location = 0 + (location + distance - 100)
            else:
                location += distance
        elif direct == "L":
            if location - distance < 0:
                location = 100 - abs(location - distance)
            else:
                location -= distance
        if location == 0 or location == 100:
            count += 1
        print(f"{e} from {startLoc} to: {location}")

    print(count)


part2(real_data)

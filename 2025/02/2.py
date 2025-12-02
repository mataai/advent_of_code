import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from shared.base_module import load_input

real_data = load_input(__file__)

demo_data = """11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"""


def part2(data: str):
    ranges_list = data.split(",")
    ranges = [r.split("-") for r in ranges_list]
    invalid_sum = 0
    for r in ranges:
        r[0] = int(r[0])
        r[1] = int(r[1])
        # for each id
        for id in range(r[0], r[1] + 1):
            idstr = str(id)
            invalid = False
            for size in range(len(idstr) // 2, 0, -1):
                if len(idstr) % size == 1:
                    continue

                parts = [
                    idstr[i : i + size] for i in range(0, len(idstr), size)
                ]
                equals = all(
                    parts.count(part) == len(idstr) // size
                    for part in parts[1:]
                )
                if equals:
                    invalid = True
                    break
            if invalid:
                invalid_sum += id

    print(ranges)
    print(invalid_sum)


def part1(data: str):
    ranges_list = data.split(",")
    ranges = [r.split("-") for r in ranges_list]
    invalid_sum = 0
    for r in ranges:
        r[0] = int(r[0])
        r[1] = int(r[1])
        # for each id
        for id in range(r[0], r[1] + 1):
            idstr = str(id)
            invalid = False
            if len(idstr) % 2 == 1:
                continue
            parts = idstr[: len(idstr) // 2], idstr[len(idstr) // 2 :]
            if parts[0] == parts[1]:
                invalid = True
            if invalid:
                invalid_sum += id

    print(ranges)
    print(invalid_sum)


part2(real_data)

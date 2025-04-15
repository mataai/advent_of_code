def opCodeAndValueFromInstruction(instruction: str):
    opCode = instruction.split(" ")[0]
    value: int = (
        instruction.split(" ")[1] if instruction.split(" ").__len__() > 1 else 0
    )
    return opCode, value


xRegister = 1
clockCycle = 0
valueChecks = [20, 60, 100, 140, 180, 220]
totalSum = 0

# read file from input.txt
with open("C:\\Users\\matei\\projects\\advent_of_code\\2022\\10\input.txt", "r") as f:
    rawData = f.read()

# split data by \n
data = rawData.split("\n")

for i in range(0, data.__len__()):
    instruction = data[i]

    opCode, value = opCodeAndValueFromInstruction(instruction)
    prevOpCode, prevValue = (
        opCodeAndValueFromInstruction(data[i - 1]) if i > 0 else ("", 0)
    )

    if clockCycle in valueChecks:
        print(str(clockCycle) + "|" + str(xRegister))
        totalSum += int(xRegister) * clockCycle
    if clockCycle + 1 in valueChecks:
        totalSum += int(xRegister) * (clockCycle + 1)
    if opCode == "noop":
        clockCycle += 1
    elif opCode == "addx":
        xRegister += int(value)
        clockCycle += 2

print("Total sum: " + str(totalSum))

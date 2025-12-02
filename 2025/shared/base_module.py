import os

def load_input(caller_file):
    """
    Loads input.txt from the same directory as the caller_file.
    """
    directory = os.path.dirname(os.path.abspath(caller_file))
    input_path = os.path.join(directory, 'input.txt')
    with open(input_path, 'r') as f:
        return f.read()

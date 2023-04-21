import os
import sys


def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')


def input_error_handle(txt="") -> str:
    try:
        return input(txt)
    except KeyboardInterrupt:
        sys.exit()


def menu() -> str:
    """
    The menu for what to do.
    :return: the input that is given.
    """
    clear_screen()
    print("Choose what you want to do.\n"
          "1. Search for word\n"
          "2. Exit")
    prompt = input_error_handle(">> ")

    return prompt


def file_menu():
    """
    The menu used to select file.
    Lists all the files in files directory.
    :return: the input that is given.
    """
    clear_screen()

    files = os.listdir('files')

    files_string = f""

    for i, file in enumerate(files):
        if (i + 1) % 3 == 0:
            files_string += f"{file: <32}\n"

        elif (i + 1) % 2 == 0:
            files_string += f"{file: <32}"

        else:
            files_string += f"{file: <32}"

    print(f"{files_string}\n\n"
          f"Write witch file you want to search.\n"
          f"1. Back\n"
          f"2. Exit")
    prompt = input_error_handle(">> ")
    return prompt


def searching_menu(p: str):
    """
    The menu that is shown for all the options to do with a file.
    It will recursively call itself until you either say back or exits.
    """

    clear_screen()
    print(f"What do you want to do? Searching in the file {p}.\n"
          f"1. Print all instances of word.\n"
          f"2. Count all instances of word.\n"
          f"3. Check for word.\n"
          f"4. Print lines with word.\n"
          f"5. Print the entire text.\n"
          f"6. Back\n"
          f"7. Exit")
    prompt = input_error_handle(">> ")
    return interpret_searching_menu(prompt, p)


def word_prompt(msg: str) -> str:
    """
    For printing the msg and taking input.
    Used by all the different functions below.
    """
    clear_screen()
    print(msg)
    return input_error_handle(">> ")


def print_all_instances(file) -> bool:
    word = word_prompt(f"Write the word you want to find all instances of in the {file} file.")

    with open(os.path.join('files', file)) as f:
        for line in f.readlines():
            words = line.split(" ")
            if word in words:
                print(word)

    input_error_handle(">> ")
    return True


def count_instances(file) -> bool:
    word = word_prompt(f"Write the word you want to count all instances of in the {file} file.")

    count = 0

    with open(os.path.join('files', file)) as f:
        for line in f.readlines():
            words = line.split(" ")
            if word in words:
                count += 1

    print(f"The word {word} showed up {count} times in {file}.")
    input_error_handle(">> ")
    return True


def check_for_word(file) -> bool:
    word = word_prompt(f"Write the word you want to check for in the {file} file.")

    exists = False

    with open(os.path.join('files', file)) as f:
        for line in f.readlines():
            words = line.split(" ")
            if word in words:
                exists = True
                break

    print(f"The word {word} is in {file}." if exists else f"the word {word} is not in {file}")
    input_error_handle(">> ")
    return True


def print_lines_with_word(file) -> bool:
    word = word_prompt(f"Write the word you want to print lines "
                       f"containing this word in the {file} file.")

    with open(os.path.join('files', file)) as f:
        for line in f.readlines():
            words = line.split(" ")
            if word in words:
                print(line)
                continue

    input_error_handle(">> ")

    return True


def print_the_entire_text(file) -> bool:

    text = ""

    with open(os.path.join('files', file)) as f:
        for line in f.readlines():
            text += line

    print(text)
    input_error_handle(">> ")
    return True


def interpret_searching_menu(p: str, file):
    match p:
        case "1": return print_all_instances(file)
        case "2": return count_instances(file)
        case "3": return check_for_word(file)
        case "4": return print_lines_with_word(file)
        case "5": return print_the_entire_text(file)
        case "6": return False
        case "7": sys.exit()

    return True


def interpret_menu_prompt(p: str):
    match p:
        case "1": interpret_search_prompt(file_menu())
        case "2": sys.exit()


def interpret_search_prompt(p: str):
    match p:
        case "1": return
        case "2": sys.exit()

    if os.path.exists(os.path.join('files', p)):

        while True:
            search_made = searching_menu(p)
            if not search_made:
                break
        return

    interpret_search_prompt(file_menu())


def main():
    while True:

        prompt: str = menu()
        interpret_menu_prompt(prompt)


if __name__ == "__main__":
    main()

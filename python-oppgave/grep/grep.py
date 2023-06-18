import sys

if len(sys.argv) == 1:
    print("You need at least one argument.")
    sys.exit()


words = sys.argv[1:]


def search(inner_line) -> bool:
    for word in words:
        if word in inner_line:
            return True
    return False


try:
    for line in sys.stdin:

        result = search(line)

        if result:
            print(line)

except KeyboardInterrupt:
    sys.exit()

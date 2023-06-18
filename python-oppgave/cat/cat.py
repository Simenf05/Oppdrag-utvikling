from sys import exit, argv
from os.path import isfile

if len(argv) == 1:
    print("You need at least one argument.")
    exit()

file = argv[1]

if not isfile(file):
    print("Could not find that file.")
    exit()

with open(file) as f:
    print(f.read())

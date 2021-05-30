import { getPointsFromSquare } from "../scrabble/logic/getpointsfromsquare";
import { playCommandHasLettersFromRack } from "../scrabble/logic/playcommandhaslettersfromrack";
import { parsePlayCommand } from "../scrabble/logic/parseplaycommand";
import { parseBoard } from "../scrabble/logic/parseboard";
import { playMove } from "../scrabble/logic/playmove";
import { ISquare } from "../scrabble/logic/isquare";
import { IMove } from "../scrabble/logic/imove";
import { Letter } from "../scrabble/logic/letter";
import { letterValueMap } from "../scrabble/logic/lettervaluemap";
import { Multiplier } from "../scrabble/logic/multiplier";
import { MultiplierType } from "../scrabble/logic/multipliertype";

describe("Logic", () => {
    describe("#getPointsFromSquare", () => {
        it("returns 1x value for an already played square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: true,
                blankLetter: "",
                multiplier: Multiplier.Triple,
                multiplierType: MultiplierType.Letter,
            };

            const points = getPointsFromSquare(sq, []);

            console.assert(points === letterValueMap[sq.letter]);
        });

        it("doesn't add to accumulated multipliers for an already played square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: true,
                blankLetter: "",
                multiplier: Multiplier.Triple,
                multiplierType: MultiplierType.Letter,
            };

            const accum: Multiplier[] = [];
            const points = getPointsFromSquare(sq, accum);

            console.assert(accum.length === 0);
        });

        it("returns 1x value for playing on a normal square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: false,
                blankLetter: "",
                multiplier: Multiplier.None,
                multiplierType: MultiplierType.None,
            };

            const points = getPointsFromSquare(sq, []);

            console.assert(points === letterValueMap[sq.letter]);
        });

        it("returns 2x value for playing on a double-letter square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: false,
                blankLetter: "",
                multiplier: Multiplier.Double,
                multiplierType: MultiplierType.Letter,
            };

            const points = getPointsFromSquare(sq, []);

            console.assert(points === letterValueMap[sq.letter] * 2);
        });

        it("returns 3x value for playing on a triple-letter square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: false,
                blankLetter: "",
                multiplier: Multiplier.Triple,
                multiplierType: MultiplierType.Letter,
            };

            const points = getPointsFromSquare(sq, []);

            console.assert(points === letterValueMap[sq.letter] * 3);
        });

        // This is because it accumulates the value into the multiplier array (output)
        it("returns 1x value for playing on a double-word square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: false,
                blankLetter: "",
                multiplier: Multiplier.Double,
                multiplierType: MultiplierType.Word,
            };

            const points = getPointsFromSquare(sq, []);

            console.assert(points === letterValueMap[sq.letter]);
        });

        it("adds to accumulated multipliers when playing on a double-word square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: false,
                blankLetter: "",
                multiplier: Multiplier.Double,
                multiplierType: MultiplierType.Word,
            };

            const accum: Multiplier[] = [];
            const points = getPointsFromSquare(sq, accum);

            console.assert(accum[0] === Multiplier.Double);
        });

        it("adds to accumulated multipliers when playing on a triple-word square", () => {
            const sq: ISquare = {
                id: "",
                letter: Letter.Z,
                played: false,
                blankLetter: "",
                multiplier: Multiplier.Triple,
                multiplierType: MultiplierType.Word,
            };

            const accum: Multiplier[] = [];
            const points = getPointsFromSquare(sq, accum);

            console.assert(accum[0] === Multiplier.Triple);
        });
    });

    describe("#playCommandHasLettersFromRack", () => {
        it("validates at least one letter was played from rack", () => {
            const move: IMove = {
                x: 0,
                y: 0,
                isVertical: false,
                letters: ["B", "A", "R"],
                id: "",
            };
            const lettersFromRack = [Letter.A, Letter.Z];

            console.assert(
                playCommandHasLettersFromRack(move, lettersFromRack)
            );
        });

        it("validates at least one letter was played from rack (blank)", () => {
            const move: IMove = {
                x: 0,
                y: 0,
                isVertical: false,
                letters: ["B", "a", "R"],
                id: "",
            };
            const lettersFromRack = [Letter.BLANK, Letter.Z];

            console.assert(
                playCommandHasLettersFromRack(move, lettersFromRack)
            );
        });
    });

    describe("#parsePlayCommand", () => {
        it("requires word of at least two letters (A H8 V)", () => {
            const command = "A H8 V";
            let error = "";

            try {
                parsePlayCommand(command);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("doesn't accept invalid command (APPLE)", () => {
            const invalidCommand = "APPLE";
            let error = "";

            try {
                parsePlayCommand(invalidCommand);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("doesn't accept invalid command (APPLE H)", () => {
            const invalidCommand = "APPLE H";
            let error = "";

            try {
                parsePlayCommand(invalidCommand);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("doesn't accept invalid command (APPLE G8)", () => {
            const invalidCommand = "APPLE G8";
            let error = "";

            try {
                parsePlayCommand(invalidCommand);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("doesn't accept invalid direction (APPLE A2 A)", () => {
            const invalidCommand = "APPLE A2 A";
            let error = "";

            try {
                parsePlayCommand(invalidCommand);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("doesn't accept invalid coordinates (APPLE W2 H)", () => {
            const invalidCommand = "APPLE W2 H";
            let error = "";

            try {
                parsePlayCommand(invalidCommand);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("doesn't accept invalid coordinates (APPLE f20 H)", () => {
            const invalidCommand = "APPLE f20 H";
            let error = "";

            try {
                parsePlayCommand(invalidCommand);
            } catch (err) {
                error = (err as Error).message;
            }

            console.assert(error !== "", error);
        });

        it("does accept valid command (APPLE a1 V) - X", () => {
            const command = "APPLE a1 V";
            const move = parsePlayCommand(command);

            console.assert(move.x === 0);
        });

        it("does accept valid command (APPLE a1 V) - Y", () => {
            const command = "APPLE a1 V";
            const move = parsePlayCommand(command);

            console.assert(move.y === 0);
        });

        it("does accept valid command (APPLE a1 V) - isVertical", () => {
            const command = "APPLE a1 V";
            const move = parsePlayCommand(command);

            console.assert(move.isVertical === true);
        });

        it("does accept valid command (APPLE a1 V) - letters", () => {
            const command = "APPLE a1 V";
            const move = parsePlayCommand(command);

            console.assert(move.letters.join("") === "APPLE");
        });

        it("does accept valid command (INGRAIN O15 h) - X", () => {
            const command = "INGRAIN O15 h";
            const move = parsePlayCommand(command);

            console.assert(move.x === 14);
        });

        it("does accept valid command (INGRAIN O15 h) - Y", () => {
            const command = "INGRAIN O15 h";
            const move = parsePlayCommand(command);

            console.assert(move.y === 14);
        });

        it("does accept valid command (INGRAIN O15 h) - isVertical", () => {
            const command = "INGRAIN O15 h";
            const move = parsePlayCommand(command);

            console.assert(move.isVertical === false);
        });

        it("does accept valid command (INGRAIN O15 h) - letters", () => {
            const command = "INGRAIN O15 h";
            const move = parsePlayCommand(command);

            console.assert(move.letters.join("") === "INGRAIN");
        });
    });

    describe("#parseBoard", () => {
        it("parses a blank board", () => {
            const board = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const parsed = parseBoard(board);

            console.assert(
                parsed.every((row) =>
                    row.every((sq) => sq.letter === Letter.UNSET)
                )
            );
        });

        it("parses a square in the correct position - 1", () => {
            const board = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| |A| | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const parsed = parseBoard(board);

            console.assert(parsed[1][1].letter == Letter.A);
        });

        it("parses a square in the correct position - 2", () => {
            const board = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| |A| | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | |B| | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const parsed = parseBoard(board);

            console.assert(parsed[2][2].letter == Letter.B);
        });

        it("parses a square in the correct position - 3", () => {
            const board = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| |A| | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | |B| | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | |Y| |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const parsed = parseBoard(board);

            console.assert(parsed[13][13].letter == Letter.Y);
        });

        it("parses a square in the correct position - 4", () => {
            const board = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| |A| | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | |B| | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | |Y| |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | |z|14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const parsed = parseBoard(board);

            console.assert(parsed[14][14].letter == Letter.BLANK);
        });
    });

    describe("#playMove", () => {
        it("throws error when starting a word with a different letter on a square that is occupied", () => {
            const boardString = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1|X|X|X|X|X|X|X|X|X|X|X|X|X|X|X|0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const board = parseBoard(boardString);
            const move = parsePlayCommand("YYYY d1 v");
            let errorMessage = "";
            let result = null;

            try {
                result = playMove(move, board);
            } catch (err) {
                errorMessage = err.message;
            }

            console.assert(errorMessage != "");
        });

        it("throws an error if the first word on the board doesn't cross over the middle square", () => {
            const boardString = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const board = parseBoard(boardString);
            const move = parsePlayCommand("FIRST d1 v");
            let errorMessage = "";
            let result = null;

            try {
                result = playMove(move, board);
            } catch (err) {
                errorMessage = err.message;
            }

            console.assert(errorMessage != "");
        });

        it("throws an error if a played word isn't connected to another word on the board", () => {
            const boardString = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | |F|I|R|S|T| | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const board = parseBoard(boardString);
            const move = parsePlayCommand("SECOND a15 h");
            let errorMessage = "";
            let result = null;

            try {
                result = playMove(move, board);
            } catch (err) {
                errorMessage = err.message;
            }

            console.assert(errorMessage != "");
        });

        it("throws an error if a played word is more new tiles than rack amount", () => {
            const boardString = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | |F|I|R|S|T| | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            const board = parseBoard(boardString);
            const move = parsePlayCommand("SECONDTH a7 h");
            let errorMessage = "";
            let result = null;

            try {
                result = playMove(move, board);
            } catch (err) {
                errorMessage = err.message;
            }

            console.assert(errorMessage != "");
        });

        it("permits valid moves - example game 1", () => {
            const boardString = `
   A B C D E F G H I J K L M N O
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 1| | | | | | | | | | | | | | | |0
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 2| | | | | | | | | | | | | | | |1
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 3| | | | | | | | | | | | | | | |2
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 4| | | | | | | | | | | | | | | |3
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 5| | | | | | | | | | | | | | | |4
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 6| | | | | | | | | | | | | | | |5
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 7| | | | | | | | | | | | | | | |6
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 8| | | | | | | | | | | | | | | |7
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 9| | | | | | | | | | | | | | | |8
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
10| | | | | | | | | | | | | | | |9
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
11| | | | | | | | | | | | | | | |10
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
12| | | | | | | | | | | | | | | |11
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
13| | | | | | | | | | | | | | | |12
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
14| | | | | | | | | | | | | | | |13
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
15| | | | | | | | | | | | | | | |14
  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4
            `;

            let board = parseBoard(boardString);
            const commands: string[] = [
                "FIRST h8 h",
                "SECOND k8 v",
                "THIRD g13 h",
                "FOURTH c7 h",
                "FIFTH L5 v",
                "SIXTH k6 h",
                "FOURTHESTF c7 h",
            ];
            let total = 0;
            commands.forEach((command) => {
                const result = playMove(parsePlayCommand(command), board);
                board = result.board;
                total += result.words.reduce((agg, c) => agg + c.points, 0);
            });

            console.assert(total === 144);
        });
    });
});

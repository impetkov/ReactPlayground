import expect from "expect";
import {formatAuthors} from "./selectors";

describe('Author selectors', () => {
    describe('formattedAuthors', () => {
        it('should return formatted author data', () => {
            const authors = [
                { id: "cory-house", firstName: "Cory", lastName: "House" },
                { id: "ivan-petkov", firstName: "Ivan", lastName: "Petkov" }
            ];

            const expected = [
                { value: "cory-house", text: "Cory House" },
                { value: "ivan-petkov", text: "Ivan Petkov" }
            ];

            expect(formatAuthors(authors)).toEqual(expected);
        });
    });
});
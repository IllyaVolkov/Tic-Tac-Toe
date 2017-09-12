import {Pipe} from '@angular/core';

@Pipe({
    name: "orderByRank"
})

export class OrderByRank {
    transform(array: Array<{Rank: string}>, args: string): Array<{Rank: string}> {
        array.sort((a: {Rank: string}, b: {Rank: string}) => {
            if (a.Rank < b.Rank) {
                return 1;
            } else if (a.Rank > b.Rank) {
                return -1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
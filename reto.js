let gamedata = {
    id: null,
    try1: 0,
    try2: 0,
    try3: 0,
    total: 0,
    type: null
};

let rounds = [];

let roundPrev = {...gamedata};

function calcTotal(round, next = () => {}) {
    return round.try1 + round.try2;
}

function selectType(round) {
    switch (true) {
        case round.try1 == 10:
            return 'strike';
            break;
        case ((round.try1 > 0 && round.try2 > 0) && ((round.try1 + round.try2) == 10)):
            return 'square';
            break;
        default:
            return null;
            break;
    }
}

function selectBonus(round) {
    switch (roundPrev.type) {
        case 'strike':
            return roundPrev.total + round.total;
            break;
        case 'square':
            return roundPrev.total + round.try1;
            break;
        default:
            return roundPrev.total;
            break;
    }
}

function saveRound(round, callback = () => {}) {
    rounds.push(round);
    return callback();
}

function updateRoundPrev(roundToUpdate, callback = () => {}) {
    rounds.splice(roundToUpdate.id - 1, 1, roundToUpdate)
    return callback();
}

for (var id = 1; id <= 10; id++) {
    console.log(Round ${id})

    let round = {...gamedata};

    round.id = id;
    round.try1 = Number(prompt('Intento 1'));
    round.try2 = Number(prompt('Intento 2'));

    if (id == 10) {
        round.try3 = Number(prompt('Intento 3'));
    }

    round.total = calcTotal(round);
    round.type = selectType(round);

    let bonus = selectBonus(round);
    let totalBonus = bonus - roundPrev.total;

    roundPrev.bonus = totalBonus;
    roundPrev.total = bonus;

    round.total += roundPrev.total + round.try3;

    saveRound(round, () => {
        updateRoundPrev(roundPrev, () => {
            roundPrev = {...round};
        });
    });
}

console.table(rounds);
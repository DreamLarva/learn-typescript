{
    type gameData = 'X' | 'O' | null
    type gameDataArray = [gameData, gameData, gameData, gameData, gameData, gameData, gameData, gameData, gameData]

    let realData: gameDataArray = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
}
{
    type gameData = 'X' | 'O' | null

    interface gameDataArray {
        [propName: number]: gameData;
    }

    // let realData: gameDataArray & { length: 9 } = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X']; // Error
}



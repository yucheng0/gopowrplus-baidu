
const users = [
  { name: 'Umi', nickName: 'U', gender: 'MALE' },
  { name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

  export default {
    'GET /api/userdata': (req:any, res:any) => {
      res.json({
        // success: true,
        user:users,
        data: [
          {
              "hour": "0",
              "value": 10,
              "category": "Liquid fuel"
          },
          {
              "hour": "0",
              "value": 54,
              "category": "Solid fuel"
          },
          {
              "hour": "0",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "0",
              "value": 40,
              "category": "Cement production"
          },
          {
              "hour": "0",
              "value": 70,
              "category": "Gas flarinl"
          },
          {
              "hour": "1",
              "value": 90,
              "category": "Liquid fuel"
          },
          {
              "hour": "1",
              "value": 154,
              "category": "Solid fuel"
          },
          {
              "hour": "1",
              "value": 330,
              "category": "Gas fuel"
          },
          {
              "hour": "1",
              "value": 20,
              "category": "Cement production"
          },
          {
              "hour": "1",
              "value": 0,
              "category": "Gas flarinl"
          },
          {
              "hour": "2",
              "value": 70,
              "category": "Liquid fuel"
          },
          {
              "hour": "2",
              "value": 157,
              "category": "Solid fuel"
          },
          {
              "hour": "2",
              "value": 330,
              "category": "Gas fuel"
          },
          {
              "hour": "2",
              "value": 110,
              "category": "Cement production"
          },
          {
              "hour": "2",
              "value": 10,
              "category": "Gas flarinl"
          },
          {
              "hour": "3",
              "value": 30,
              "category": "Liquid fuel"
          },
          {
              "hour": "3",
              "value": 259,
              "category": "Solid fuel"
          },
          {
              "hour": "3",
              "value": 90,
              "category": "Gas fuel"
          },
          {
              "hour": "3",
              "value": 80,
              "category": "Cement production"
          },
          {
              "hour": "3",
              "value": 70,
              "category": "Gas flarinl"
          },
          {
              "hour": "4",
              "value": 110,
              "category": "Liquid fuel"
          },
          {
              "hour": "4",
              "value": 169,
              "category": "Solid fuel"
          },
          {
              "hour": "4",
              "value": 40,
              "category": "Gas fuel"
          },
          {
              "hour": "4",
              "value": 70,
              "category": "Cement production"
          },
          {
              "hour": "4",
              "value": 90,
              "category": "Gas flarinl"
          },
          {
              "hour": "5",
              "value": 100,
              "category": "Liquid fuel"
          },
          {
              "hour": "5",
              "value": 171,
              "category": "Solid fuel"
          },
          {
              "hour": "5",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "5",
              "value": 40,
              "category": "Cement production"
          },
          {
              "hour": "5",
              "value": 90,
              "category": "Gas flarinl"
          },
          {
              "hour": "6",
              "value": 90,
              "category": "Liquid fuel"
          },
          {
              "hour": "6",
              "value": 76,
              "category": "Solid fuel"
          },
          {
              "hour": "6",
              "value": 80,
              "category": "Gas fuel"
          },
          {
              "hour": "6",
              "value": 40,
              "category": "Cement production"
          },
          {
              "hour": "6",
              "value": 30,
              "category": "Gas flarinl"
          },
          {
              "hour": "7",
              "value": 10,
              "category": "Liquid fuel"
          },
          {
              "hour": "7",
              "value": 77,
              "category": "Solid fuel"
          },
          {
              "hour": "7",
              "value": 90,
              "category": "Gas fuel"
          },
          {
              "hour": "7",
              "value": 40,
              "category": "Cement production"
          },
          {
              "hour": "7",
              "value": 0,
              "category": "Gas flarinl"
          },
          {
              "hour": "8",
              "value": 80,
              "category": "Liquid fuel"
          },
          {
              "hour": "8",
              "value": 178,
              "category": "Solid fuel"
          },
          {
              "hour": "8",
              "value": 440,
              "category": "Gas fuel"
          },
          {
              "hour": "8",
              "value": 330,
              "category": "Cement production"
          },
          {
              "hour": "8",
              "value": 30,
              "category": "Gas flarinl"
          },
          {
              "hour": "9",
              "value": 80,
              "category": "Liquid fuel"
          },
          {
              "hour": "9",
              "value": 83,
              "category": "Solid fuel"
          },
          {
              "hour": "9",
              "value": 60,
              "category": "Gas fuel"
          },
          {
              "hour": "9",
              "value": 10,
              "category": "Cement production"
          },
          {
              "hour": "9",
              "value": 40,
              "category": "Gas flarinl"
          },
          {
              "hour": "10",
              "value": 70,
              "category": "Liquid fuel"
          },
          {
              "hour": "10",
              "value": 391,
              "category": "Solid fuel"
          },
          {
              "hour": "10",
              "value": 330,
              "category": "Gas fuel"
          },
          {
              "hour": "10",
              "value": 70,
              "category": "Cement production"
          },
          {
              "hour": "10",
              "value": 50,
              "category": "Gas flarinl"
          },
          {
              "hour": "11",
              "value": 0,
              "category": "Liquid fuel"
          },
          {
              "hour": "11",
              "value": 95,
              "category": "Solid fuel"
          },
          {
              "hour": "11",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "11",
              "value": 80,
              "category": "Cement production"
          },
          {
              "hour": "11",
              "value": 30,
              "category": "Gas flarinl"
          },
          {
              "hour": "12",
              "value": 120,
              "category": "Liquid fuel"
          },
          {
              "hour": "12",
              "value": 96,
              "category": "Solid fuel"
          },
          {
              "hour": "12",
              "value": 60,
              "category": "Gas fuel"
          },
          {
              "hour": "12",
              "value": 90,
              "category": "Cement production"
          },
          {
              "hour": "12",
              "value": 90,
              "category": "Gas flarinl"
          },
          {
              "hour": "13",
              "value": 40,
              "category": "Liquid fuel"
          },
          {
              "hour": "13",
              "value": 103,
              "category": "Solid fuel"
          },
          {
              "hour": "13",
              "value": 10,
              "category": "Gas fuel"
          },
          {
              "hour": "13",
              "value": 100,
              "category": "Cement production"
          },
          {
              "hour": "13",
              "value": 200,
              "category": "Gas flarinl"
          },
          {
              "hour": "14",
              "value": 30,
              "category": "Liquid fuel"
          },
          {
              "hour": "14",
              "value": 112,
              "category": "Solid fuel"
          },
          {
              "hour": "14",
              "value": 70,
              "category": "Gas fuel"
          },
          {
              "hour": "14",
              "value": 80,
              "category": "Cement production"
          },
          {
              "hour": "14",
              "value": 40,
              "category": "Gas flarinl"
          },
          {
              "hour": "15",
              "value": 220,
              "category": "Liquid fuel"
          },
          {
              "hour": "15",
              "value": 119,
              "category": "Solid fuel"
          },
          {
              "hour": "15",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "15",
              "value": 0,
              "category": "Cement production"
          },
          {
              "hour": "15",
              "value": 30,
              "category": "Gas flarinl"
          },
          {
              "hour": "16",
              "value": 40,
              "category": "Liquid fuel"
          },
          {
              "hour": "16",
              "value": 122,
              "category": "Solid fuel"
          },
          {
              "hour": "16",
              "value": 70,
              "category": "Gas fuel"
          },
          {
              "hour": "16",
              "value": 60,
              "category": "Cement production"
          },
          {
              "hour": "16",
              "value": 30,
              "category": "Gas flarinl"
          },
          {
              "hour": "17",
              "value": 40,
              "category": "Liquid fuel"
          },
          {
              "hour": "17",
              "value": 130,
              "category": "Solid fuel"
          },
          {
              "hour": "17",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "17",
              "value": 100,
              "category": "Cement production"
          },
          {
              "hour": "17",
              "value": 30,
              "category": "Gas flarinl"
          },
          {
              "hour": "18",
              "value": 80,
              "category": "Liquid fuel"
          },
          {
              "hour": "18",
              "value": 134,
              "category": "Solid fuel"
          },
          {
              "hour": "18",
              "value": 20,
              "category": "Gas fuel"
          },
          {
              "hour": "18",
              "value": 10,
              "category": "Cement production"
          },
          {
              "hour": "18",
              "value": 100,
              "category": "Gas flarinl"
          },
          {
              "hour": "19",
              "value": 80,
              "category": "Liquid fuel"
          },
          {
              "hour": "19",
              "value": 142,
              "category": "Solid fuel"
          },
          {
              "hour": "19",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "19",
              "value": 100,
              "category": "Cement production"
          },
          {
              "hour": "19",
              "value": 10,
              "category": "Gas flarinl"
          },
          {
              "hour": "20",
              "value": 12,
              "category": "Liquid fuel"
          },
          {
              "hour": "20",
              "value": 146,
              "category": "Solid fuel"
          },
          {
              "hour": "20",
              "value": 130,
              "category": "Gas fuel"
          },
          {
              "hour": "20",
              "value": 230,
              "category": "Cement production"
          },
          {
              "hour": "20",
              "value": 60,
              "category": "Gas flarinl"
          },
          {
              "hour": "21",
              "value": 10,
              "category": "Liquid fuel"
          },
          {
              "hour": "21",
              "value": 156,
              "category": "Solid fuel"
          },
          {
              "hour": "21",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "21",
              "value": 40,
              "category": "Cement production"
          },
          {
              "hour": "21",
              "value": 80,
              "category": "Gas flarinl"
          },
          {
              "hour": "22",
              "value": 10,
              "category": "Liquid fuel"
          },
          {
              "hour": "22",
              "value": 173,
              "category": "Solid fuel"
          },
          {
              "hour": "22",
              "value": 30,
              "category": "Gas fuel"
          },
          {
              "hour": "22",
              "value": 90,
              "category": "Cement production"
          },
          {
              "hour": "22",
              "value": 10,
              "category": "Gas flarinl"
          },
          {
              "hour": "23",
              "value": 13,
              "category": "Liquid fuel"
          },
          {
              "hour": "23",
              "value": 183,
              "category": "Solid fuel"
          },
          {
              "hour": "23",
              "value": 40,
              "category": "Gas fuel"
          },
          {
              "hour": "23",
              "value": 80,
              "category": "Cement production"
          },
          {
              "hour": "23",
              "value": 10,
              "category": "Gas flarinl"
          },          
                  ]
         },
      )
    }
}
       
  
  
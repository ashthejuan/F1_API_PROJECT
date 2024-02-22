import express, { response } from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'))

app.get("/", (req, res) => {    
    res.render("index.ejs")
})

app.post("/races", async (req, res) => {
    const seasonID = req.body.season;
    const roundID = req.body.round;
    try{
        const API_URL = `https://ergast.com/api/f1/${seasonID}/${roundID}/results.json`
        const response = await axios.get(API_URL)
        const raceData = response.data.MRData.RaceTable.Races[0];
        const raceResults = raceData.Results
        res.render('races.ejs', { raceData, raceResults });
    } catch (error) {
        res.render('error', { error: 'Race Data not found'})
        console.log(error.message)
    }
})
    
    
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})




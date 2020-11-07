const express = require("express");
const app = express();
const db = require("./db/");
const port = process.env.PORT || 5000;
const Task = require("./db/models/Task");

app.get("/", async (req, res) => {
	try {
		await Task.find({}, (err, tasks) => {
			if (err) {
				return res.status(400).json({ success: false, error: err });
			}
			if (!tasks.length) {
				return res
					.status(404)
					.json({ success: false, error: `Movie not found` });
			}
			return res.status(200).json({ success: true, data: tasks });
		});
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

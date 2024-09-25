import React, { useState } from "react";
import {
	TextField,
	Button,
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	IconButton,
	Modal,
	Fade,
	Backdrop,
	List,
	ListItem,
	ListItemText,
	InputBase,
	Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

// Static query data with folder, name, and blobpath
const queries = [
	{
		folder: "dip_use_case",
		name: "count_datasets_keyword_fentanyl.rq",
		blobpath:
			"knowledge_graph/sparql/dip_use_case/count_datasets_keyword_fentanyl.rq",
	},
	{
		folder: "dip_use_case",
		name: "datasets_with_keyword_fentanyl_and_seizure.rq",
		blobpath:
			"knowledge_graph/sparql/dip_use_case/datasets_with_keyword_fentanyl_and_seizure.rq",
	},
	{
		folder: "dip_use_case",
		name: "datasets_with_keyword_fentanyl_and_seizure.rq",
		blobpath:
			"knowledge_graph/sparql/dip_use_case/datasets_with_keyword_fentanyl_and_seizure.rq",
	},
	{
		folder: "fentanyl_use_case",
		name: "fentanyl_quantity_by_form.rq",
		blobpath:
			"knowledge_graph/sparql/fentanyl_use_case/fentanyl_quantity_by_form.rq",
	},
	{
		folder: "fentanyl_use_case",
		name: "fentanyl_quantity_by_form.rq",
		blobpath:
			"knowledge_graph/sparql/fentanyl_use_case/fentanyl_quantity_by_form.rq",
	},
	{
		folder: "utilities",
		name: "TotalNumberClasses.rq",
		blobpath: "knowledge_graph/sparql/utilities/TotalNumberClasses.rq",
	},
];

// Group queries by folder
const groupQueriesByFolder = (queries) => {
	return queries.reduce((acc, query) => {
		if (!acc[query.folder]) {
			acc[query.folder] = [];
		}
		acc[query.folder].push(query);
		return acc;
	}, {});
};

const DSQPage = () => {
	const [currentEdit, setCurrentEdit] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [results, setResults] = useState({});
	const [activeResult, setActiveResult] = useState(null); // To track which query's result is active
	const [searchTerm, setSearchTerm] = useState("");

	// Simulated "run" query button click
	const runQuery = (queryName) => {
		// Simulated result
		setTimeout(() => {
			const mockResponse = {
				message: `Results for ${queryName}`,
			};
			setResults((prevResults) => ({
				...prevResults,
				[queryName]: mockResponse,
			}));
			setActiveResult(queryName); // Show the result
		}, 1000);
	};

	// Open edit modal
	const handleEdit = (query) => {
		setCurrentEdit(query);
		setIsModalOpen(true);
	};

	// Save edited query
	const saveQuery = () => {
		setIsModalOpen(false);
		// In a real-world scenario, we would update the query in the data source here
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Filtered queries based on search term
	const filteredQueries = queries.filter((query) =>
		query.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const groupedQueries = groupQueriesByFolder(filteredQueries);

	return (
		<Box sx={{ padding: "20px" }}>
			<Grid container spacing={3}>
				{/* Query List with Folders */}
				<Grid item xs={12} sm={4}>
					<Typography variant="h5" sx={{ mb: 2 }}>
						Search Queries
					</Typography>
					<Paper
						sx={{
							marginRight: "18px",
							p: "2px 4px",
							display: "flex",
							alignItems: "center",
							marginBottom: "10px",
						}}>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Search Queries"
							inputProps={{ "aria-label": "search queries" }}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</Paper>
					<Box
						className="custom-scrollbar"
						sx={{ height: "80vh", overflowY: "auto", pr: 1 }}>
						{Object.entries(groupedQueries).map(([folder, queries]) => (
							<Box key={folder} sx={{ marginBottom: "20px" }}>
								<Typography variant="h6" sx={{ fontWeight: "bold" }}>
									{folder}
								</Typography>
								<List>
									{queries.map((query, index) => (
										<Card
											key={index}
											sx={{
												marginBottom: "10px",
												position: "relative",
												paddingRight: "60px", // Ensures space for the icons
											}}>
											<CardContent>
												<ListItemText
													primary={
														<Typography
															sx={{
																whiteSpace: "nowrap",
																overflow: "hidden",
																textOverflow: "ellipsis",
																maxWidth: "90%", // Limit text width
																fontWeight: "bold",
															}}
															title={query.name}>
															{query.name}
														</Typography>
													}
													secondary={
														<Typography
															sx={{
																whiteSpace: "nowrap",
																overflow: "hidden",
																textOverflow: "ellipsis",
																maxWidth: "90%", // Limit text width
																fontStyle: "italic",
															}}
															title={query.blobpath} // Display full text on hover
														>
															{query.blobpath}
														</Typography>
													}
												/>
												<Box
													sx={{
														position: "absolute",
														top: "8px",
														right: "8px",
													}}>
													<IconButton
														onClick={() => handleEdit(query)}
														size="small">
														<EditIcon />
													</IconButton>
													<IconButton
														onClick={() => runQuery(query.name)}
														size="small">
														<PlayArrowIcon />
													</IconButton>
												</Box>
											</CardContent>
										</Card>
									))}
								</List>
							</Box>
						))}
					</Box>
				</Grid>

				{/* Query Editor Modal */}
				<Modal
					open={isModalOpen}
					onClose={handleCloseModal}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{
						timeout: 500,
						sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" }, // Dark backdrop
					}}>
					<Fade in={isModalOpen}>
						<Box
							sx={{
								position: "absolute",
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%)",
								width: "600px",
								bgcolor: "background.paper",
								boxShadow: 24,
								borderRadius: 3, // Rounded corners
								p: 4,
								outline: "none", // Remove default outline
							}}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
									mb: 2,
								}}>
								<Typography variant="h6" component="h2">
									Edit Query
								</Typography>
								<IconButton onClick={handleCloseModal}>
									<CloseIcon />
								</IconButton>
							</Box>
							<TextField
								fullWidth
								multiline
								rows={5}
								value={currentEdit?.name || ""}
								sx={{ marginBottom: 2 }}
							/>
							<Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
								<Button
									onClick={handleCloseModal}
									variant="outlined"
									color="secondary">
									Close
								</Button>
								<Button onClick={saveQuery} variant="contained" color="primary">
									Save
								</Button>
							</Box>
						</Box>
					</Fade>
				</Modal>

				{/* Results Section */}
				<Grid item xs={12} sm={8}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Query Results
					</Typography>
					<Box sx={{ maxHeight: "80vh", overflowY: "auto" }}>
						{activeResult && (
							<Card sx={{ mb: 2 }}>
								<CardContent>
									<Typography variant="body1">
										{results[activeResult]?.message || "No results yet"}
									</Typography>
								</CardContent>
							</Card>
						)}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default DSQPage;

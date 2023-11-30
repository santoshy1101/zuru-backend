const { Router } = require("express");
const { Project } = require("./models/Project.model");

const router = Router();

// Create a new project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read a specific project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a project by ID
router.patch("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).send();
    }
    res.send(project);
  } catch (error) {
    res.status(500).send(error);
  }
});

// CRUD operations for links within a project

// Create a new link within a project
router.post("/:projectId/links", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).send();
    }

    project.links.push(req.body);
    await project.save();
    res.status(201).send(project.links[project.links.length - 1]);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a link within a project by link ID
router.patch("/:projectId/links/:linkId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).send();
    }

    const link = project.links.id(req.params.linkId);
    if (!link) {
      return res.status(404).send();
    }

    Object.assign(link, req.body);
    await project.save();
    res.send(link);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a link within a project by link ID
router.delete("/:projectId/links/:linkId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).send();
    }

    const link = project.links.id(req.params.linkId);
    if (!link) {
      return res.status(404).send();
    }

    link.remove();
    await project.save();
    res.send(link);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

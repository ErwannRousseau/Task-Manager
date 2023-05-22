# API endpoints

## Tasks

| Endpoint          | HTTP method | Data to send | Description               | Parameters                      |
| ----------------- | ----------- | ------------ | ------------------------- | ------------------------------- |
| `/api/tasks`      | GET         | -            | Get all tasks details     | -                               |
| `/api/tasks/[id]` | GET         | -            | Get a single task details | `id` - ID of the task to show   |
| `/api/tasks`      | POST        | `title`      | Create a new task         | -                               |
| `/api/tasks/[id]` | PUT         | `title`      | Update a task             | `id` - ID of the task to update |
| `/api/tasks/[id]` | DELETE      | -            | Delete a task             | `id` - ID of the task to delete |

## Categories

| Endpoint               | HTTP method | Data to send | Description                   | Parameters                          |
| ---------------------- | ----------- | ------------ | ----------------------------- | ----------------------------------- |
| `/api/categories`      | GET         | -            | Get all category details      | -                                   |
| `/api/categories/[id]` | GET         | -            | Get a single category details | `id` - ID of the category to show   |
| `/api/categories`      | POST        | `name`       | Create a new category         | -                                   |
| `/api/categories/[id]` | PUT         | `name`       | Update a category             | `id` - ID of the category to update |
| `/api/categories/[id]` | DELETE      | -            | Delete a category             | `id` - ID of the category to delete |

## Tags

| Endpoint         | HTTP method | Data to send | Description              | Parameters                      |
| ---------------- | ----------- | ------------ | ------------------------ | ------------------------------- |
| `/api/tags`      | GET         | -            | Get all tags details     | -                               |
| `/api/tags/[id]` | GET         | -            | Get a single tag details | `id` - ID of the tag to show    |
| `/api/tags`      | POST        | `label`      | Create a new tag         | -                               |
| `/api/tags/[id]` | PUT         | `label`      | Update a tag             | `id` - ID of the tag to update  |
| `/api/tags/[id]` | DELETE      | -            | Delete a tag             | `id` - ID of the task to delete |

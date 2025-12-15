# Paths (relative)
FRONTEND_DIR := ./frontend
TEMPLATES_DIR := ./portfolio/templates

# Detect environment
ifeq ($(OS),Windows_NT)
    # Development (Windows)
    PYTHON := .venv\Scripts\python.exe
else
    # Production (Linux)
    VENV := ./venv/bin/activate
endif

# PHONY targets
.PHONY: deploy frontend copy collect restart dev

# Production Deployment
deploy: frontend copy collect restart
	@echo "Production deployment completed"

frontend:
	cd $(FRONTEND_DIR) && npm install
	cd $(FRONTEND_DIR) && npm run build

copy:
	cp $(FRONTEND_DIR)/build/index.html $(TEMPLATES_DIR)/index.html

collect:
	. $(VENV) && python manage.py collectstatic --noinput

restart:
	sudo systemctl restart gunicorn
	sudo systemctl restart nginx

# Development
run-frontend:
ifeq ($(OS),Windows_NT)
	cd $(FRONTEND_DIR) && npx concurrently "npm start" "sass --watch src/css/styles.scss:src/css/styles.css"
else
	@echo "dev-frontend target intended for Windows development environment."
endif

# Backend dev server (Django)
run-backend:
ifeq ($(OS),Windows_NT)
	$(PYTHON) manage.py runserver
else
	@echo "dev-backend target intended for Windows development environment."
endif

PROJECT_DIR := /home/ubuntu/portfolio
FRONTEND_DIR := $(PROJECT_DIR)/frontend
TEMPLATES_DIR := $(PROJECT_DIR)/portfolio/templates
VENV := $(PROJECT_DIR)/venv/bin/activate

.PHONY: deploy frontend copy collect restart

deploy: frontend copy collect restart
	@echo "Deployment completed"

frontend:
	cd $(FRONTEND_DIR) && npm install
	cd $(FRONTEND_DIR) && npm run build

copy:
	cp $(FRONTEND_DIR)/build/index.html $(TEMPLATES_DIR)/index.html

collect:
	cd $(PROJECT_DIR) && \
	. $(VENV) && \
	python manage.py collectstatic --noinput

restart:
	sudo systemctl restart gunicorn
	sudo systemctl restart nginx

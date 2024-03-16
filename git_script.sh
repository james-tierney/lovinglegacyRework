#!/bin/bash

# Get current date and time
current_time=$(date +"%Y-%m-%d %T")

# Commit with current time in the message
git add .
git commit -m "Script commit at $current_time"
git push origin main

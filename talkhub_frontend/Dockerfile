FROM nginx:1.17.5

# Set the working directory inside the container
WORKDIR /talkhub_frontend

# Expose port 3000
EXPOSE 3000

# Copy Nginx configuration
COPY ./config/talkhub_frontend.conf /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# GVCC Learning Portal

## Overview

A responsive learning portal built with Next.js where students can watch learning videos, create bookmarks at specific timestamps, and resume playback from saved bookmarks.

## Features

- Learning Portal Dashboard
- Multiple Learning Videos
- Video Player
- Multiple Bookmarks Per Video
- Resume Playback from Bookmarks
- Continue Watching
- Persistent Local Storage
- Screenshot Protection
  - Watermark Overlay
  - Right Click Disabled
  - Blur on Tab Switch
- Responsive UI

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- React Player
- Local Storage

## Installation

```bash
npm install
npm run dev
```

## Project Structure

```text
src/
 ├── app/
 ├── components/
 ├── data/
 └── lib/

public/
 ├── thumbnails/
 └── videos/
```

## Screenshot Protection

Browsers cannot completely prevent operating system screenshots. This project implements practical deterrents including:

- Watermark overlay
- Right-click prevention
- Blur when the browser tab loses focus

## Future Improvements

- Firebase Database
- Authentication
- Watch Progress Analytics
- Cloud Video Storage

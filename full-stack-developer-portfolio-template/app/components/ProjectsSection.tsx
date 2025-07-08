'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const projects = [
	{
		title: 'Portfolio Generator (ResumeCraft AI)',
		description: 'Intelligent portfolio generator creating personalized portfolios from user forms and AI assistance. Built with React, Node.js, Firebase, and Gemini API. Features automatic content generation (bio, projects, skills) with default value detection, styled templates, live preview, and instant multi-format export.',
		images: ['/projects/portfolio1.jpg', '/projects/portfolio2.jpg', '/projects/portfolio3.jpg'],
	},
	{
		title: 'PWA AvisMTL',
		description: 'Progressive Web App allowing users to rate and review places or services in Montreal. Built with React, IndexedDB for offline storage, and Workbox for cache management. Features offline functionality with automatic data synchronization upon reconnection.',
		images: [
			'/projects/pwa/pwa1.PNG',
			   '/projects/pwa/pwa2.PNG',
			      '/projects/pwa/pwa3.PNG',
				  '/projects/pwa/pwa4.PNG',
		],
	},
	{
		title: 'Node Biblio API',
		description: 'RESTful API for managing a virtual library with users, loans, and catalog system. Developed with Node.js, Express, MongoDB, and JWT for secure authentication. Includes complete CRUD routes, pagination, sorting, and access protection. Used as modular backend for frontend projects.',
		images: ['/projects/nodelibrary/diag.png'],
	},
];

export default function ProjectsSection() {
	const [currentProject, setCurrentProject] = useState(0);
	const [currentImages, setCurrentImages] = useState(Array(projects.length).fill(0));

	const scrollProject = (direction: 'left' | 'right') => {
		setCurrentProject((prev) => {
			if (direction === 'left') return prev === 0 ? projects.length - 1 : prev - 1;
			return prev === projects.length - 1 ? 0 : prev + 1;
		});
	};

	const scrollImage = (projectIndex: number, direction: 'left' | 'right') => {
		setCurrentImages((prev) => {
			const total = projects[projectIndex].images.length;
			const newIndex = direction === 'left'
				? (prev[projectIndex] - 1 + total) % total
				: (prev[projectIndex] + 1) % total;

			const updated = [...prev];
			updated[projectIndex] = newIndex;
			return updated;
		});
	};

	return (
		<section className="py-20 px-4">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-3xl font-bold text-white mb-10">My Projects</h2>

				{/* Project Navigation Arrows */}
				<div className="flex items-center justify-center gap-6 mb-6">
					<button onClick={() => scrollProject('left')} className="text-white text-2xl hover:text-blue-400">
						←
					</button>
					<span className="text-white text-sm">
						Project {currentProject + 1} of {projects.length}
					</span>
					<button onClick={() => scrollProject('right')} className="text-white text-2xl hover:text-blue-400">
						→
					</button>
				</div>

				{/* Project Card */}
				<div className="bg-gray-900/50 border border-gray-800 rounded-lg shadow-md max-w-xl mx-auto overflow-hidden">
					{/* Project Image Carousel */}
					<div className="relative w-full h-52 sm:h-64 overflow-hidden bg-gray-800">
						<img
							src={projects[currentProject].images[currentImages[currentProject]]}
							alt="Project Image"
							className="w-full h-full object-contain"
						/>
						{/* Image Nav Arrows */}
						<button
							onClick={() => scrollImage(currentProject, 'left')}
							className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/70"
						>
							←
						</button>
						<button
							onClick={() => scrollImage(currentProject, 'right')}
							className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white px-2 py-1 rounded-full hover:bg-black/70"
						>
							→
						</button>
					</div>

					{/* Project Info */}
					<div className="p-5 text-left">
						<h3 className="text-xl font-semibold text-white mb-2">
							{projects[currentProject].title}
						</h3>
						<p className="text-sm text-gray-400">
							{projects[currentProject].description}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
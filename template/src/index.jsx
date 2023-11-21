import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, {
	loader as rootLoader,
	action as rootAction
} from './routes/root';
import ErrorPage from './error-page';
import Contact, {
	loader as contactLoader,
	action as contactAction,
} from './routes/contact';
import EditContact, {
	action as editContactAction
} from './routes/edit';
import { action as destroyContactAction } from './routes/destroy';
import Index from './routes';

const container = document.getElementById('root');

if (container === null) throw new Error('You don\'t have root element');

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children : [
			{
				errorElement: <ErrorPage/>,
				children: [
					{
						index: true,
						element: <Index />
					},
					{
						path: "contacts/:contactId",
						element: <Contact />,
						loader: contactLoader,
						action: contactAction,
					},
					{
						path: "contacts/:contactId/edit",
						element: <EditContact />,
						loader: contactLoader,
						action: editContactAction,
					},
					{
						path: "contacts/:contactId/destroy",
						action: destroyContactAction,
					}
				],
			}
		]

	},
]);

const root = ReactDOM.createRoot(container);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

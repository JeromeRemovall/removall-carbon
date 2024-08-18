import React, { useEffect } from 'react';

import '../../scss/components/ressources/containerCard.scss';
import { max, set } from 'd3';
import Card from './card';

interface ContainerCardProps {
	items: any;
	lang: string;
	itemsPerPage?: number;
	type: string;
}

const ContainerCard: React.FC<ContainerCardProps> = ({ items, lang, itemsPerPage = 9, type = "actuality" }) => {
	const [nbItem, setNbItem] = React.useState(0);
	const [currentPage, setCurrentPage] = React.useState(1);
	const [maxPage, setMaxPage] = React.useState(0);
	const [itemsToShow, setItemsToShow] = React.useState(items.slice(0, itemsPerPage));
	const [itemFilter, setItemFilter] = React.useState([].concat(items));
	const [tags, setTags] = React.useState([]);
	const [tagFilter, setTagFilter] = React.useState("");
	const [sortItem, setSortItem] = React.useState("");

	useEffect(() => {
		const filteredTags =[].concat(Array.from(new Set(items.flatMap((item: any) => item.tags?.map((tag: any) => tag.name)).filter((name: any) => name !== undefined && name !== null))));
		setTags(filteredTags);
		setSortItem("newest")
		setNbItem(itemFilter.length);
		setMaxPage(Math.ceil(itemFilter.length / itemsPerPage));
	}, [items]);

	useEffect(() => {
		setItemsToShow(itemFilter.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
	}, [currentPage]);

	useEffect(() => {
		setItemsToShow(itemFilter.slice(0, itemsPerPage));
	}, [itemFilter]);

	useEffect(() => {
		if (tagFilter === "") {
			const copieItems = [].concat(items);
			setItemFilter([].concat(copieItems));
			sort(copieItems);
		} else {
			const copieItems = [].concat(items);
			setItemFilter(copieItems.filter((item: any) => item.tags?.map((tag: any) => tag.name).includes(tagFilter)));
		}
		setCurrentPage(1);
	}, [tagFilter]);

	useEffect(() => {
		sort(itemFilter);
		setCurrentPage(1);
	}, [sortItem]);

	const sort = (items) => {
		if (sortItem === "newest") {
			setItemFilter([...items].sort((a: any, b: any) => new Date(b.date) - new Date(a.date)));
		} else if (sortItem === "oldest") {
			setItemFilter([...items].sort((a: any, b: any) => new Date(a.date) - new Date(b.date)));
		} else {
			setItemFilter([...items].sort((a: any, b: any) => new Date(b.date) - new Date(a.date)));
		}
	}

	return (
		<div className="container">
			<div className='header'>
				<p className='indicator'>{nbItem} {lang == "fr" ? "articles" : "news" }</p>
				<div className='container-selector'>
					<select name="" id="" onChange={(e) => setTagFilter(e.target.value)}>
						<option value="">{lang == "fr" ? "Tous les articles" : "All news"}</option>
						{tags.map((tag: any, index: number) => (
							<option key={index} value={tag}>{tag}</option>
						))}
					</select>
					<select name="" id="" onChange={(e) => setSortItem(e.target.value)} > 
						<option value="">{lang == "fr" ? "Trier par" : "Sort by"}</option>
						<option value="newest">{lang == "fr" ? "Plus récent" : "more recent"}</option>
						<option value="oldest">{lang == "fr" ? "Plus ancien" : "older"}</option>
					</select>
				</div>
			</div>
			<div className='container-card'>
				<div className='cards'>
					{itemsToShow.map((item: any, index: number) => (
						<Card
							key={index}
							title={item.titre}
							description={item.texte}
							tags={item.tags}
							files={item.fichier}
							linkText={item.bouton}
							image={item.image}
							lang={lang}
							time={item.duree}
							date={item.date}
							auteur={item.auteur}
							slug={item.slug}
							type={type}
						/>
					))}
				</div>
				<div className='pagination'>
					<button className={`btn-page ${currentPage == 1 ? "active" : ""}`} onClick={() => setCurrentPage(1)}>1</button>
					{currentPage - 2 >  0 && (
						<button className={`btn-page`} disabled>...</button>
					)}
					{currentPage > 2 && (
						<button className={`btn-page ${currentPage === 2 ? "active" : ""}`} onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>
					)}
					{currentPage > 1 && currentPage != maxPage &&  ( 
						<button className={`btn-page active`} onClick={() => setCurrentPage(currentPage)}>{currentPage}</button>
					)}
					{currentPage < maxPage - 1 && (
						<button className={`btn-page`} onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>
					)}
					{currentPage + 2 < maxPage && (
						<button className={`btn-page`} disabled>...</button>
					)}
					{maxPage > 1 && (
						<button className={`btn-page ${currentPage == maxPage ? "active" : ""}`} onClick={() => setCurrentPage(maxPage)}>{maxPage}</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default ContainerCard;
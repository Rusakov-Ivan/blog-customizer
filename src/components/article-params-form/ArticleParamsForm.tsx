import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useState, useRef } from 'react';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setArticleState: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const rootRef = useRef<HTMLDivElement | null>(null);

	const [isOpen, setIsOpen] = useState(false);
	const [stateForm, setStateForm] =
		useState<ArticleStateType>(currentArticleState);

	// Закрытие формы на оверлэй
	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: rootRef,
		onClose: () => setIsOpen(false),
	});

	// Стили формы
	const styleForm = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	// Смена состояния полей форм
	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setStateForm((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	// Обновление формы
	const handleUpdateForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(stateForm);
	};

	// Сборс настроек формы по умолчанию
	const handleFormReset = () => {
		setStateForm(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((isOpen) => !isOpen);
				}}
			/>
			<aside className={styleForm}>
				<form
					onSubmit={handleUpdateForm}
					onReset={handleFormReset}
					className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Select
						selected={stateForm.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleOnChange('fontFamilyOption')}
					/>

					<RadioGroup
						selected={stateForm.fontSizeOption}
						options={fontSizeOptions}
						name='fontSize'
						title='размер шрифта'
						onChange={handleOnChange('fontSizeOption')}
					/>

					<Select
						selected={stateForm.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={handleOnChange('fontColor')}
					/>

					<Separator />

					<Select
						selected={stateForm.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={handleOnChange('backgroundColor')}
					/>

					<Select
						selected={stateForm.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={handleOnChange('contentWidth')}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};

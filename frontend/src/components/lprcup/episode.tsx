import React, { ReactElement, useEffect, useState } from 'react';
import './styles/panel.css'
import {isAdmin} from "../../server/get";

// 
// Выбор эпизода
//

interface LprCupEpisodeSelectorParams {
    caption: string;
    id: string;
    activeId: string;
    activeIdUpdate: React.Dispatch<React.SetStateAction<string>>;
}

function LprCupEpisodeSelector(params: LprCupEpisodeSelectorParams) {
    var className = "lprcup_episode_selector" + (
        params.id == params.activeId ? " lces_active" : "");

    return (
        <button
            className={className}
            id={params.id}
            onClick={(e) => {
                params.activeIdUpdate(params.id);
            }}
        >
            {params.caption}
        </button>
    );
}

function LprCupBack() {
    return (
        <a
            className={"lprcup_episode_selector lces_special"}
            id={"a_back"}
            href="/grades"
        >
            Назад
        </a>
    );
}

interface LprCupNewEpisodeParams {
    season: number;
    grade: number;
}

function LprCupNewEpisode(params: LprCupNewEpisodeParams) {
    return (
        <a
            className={"lprcup_episode_selector lces_special"}
            id={"a_new"}
            href={`/lprcup/add?grade=${params.grade}&season=${params.season}`}
        >
            Добавить
        </a>
    );
}

interface LprCupEpisodesParams {
    count: number;
    activeId: string;
    activeIdUpdate: React.Dispatch<React.SetStateAction<string>>;
}

function LprCupEpisodes(params: LprCupEpisodesParams) {
    var episodes = new Array<ReactElement>();

    for (var i = 0; i < params.count; i++) {
        episodes.push(
            <LprCupEpisodeSelector
                id={`selector_${i + 1}`}
                caption={`Эпизод ${i + 1}`}
                activeId={params.activeId}
                activeIdUpdate={params.activeIdUpdate} />
        )
    }

    return episodes;
}

interface LprCupEpisodePanelParams {
    episodesCount: number;
    activeEpisodeUpdate: React.Dispatch<React.SetStateAction<number>>;
    season: number;
    grade: number;
}

export function LprCupEpisodePanel(params: LprCupEpisodePanelParams) {
    var [activeId, activeIdUpdate] = useState("selector_1");

    useEffect(() => {
        // Не хочется тут использовать регулярки :)
        var id = Number(activeId.substring(9));
        params.activeEpisodeUpdate(id);
    }, [activeId])

    console.log(`isAdmin: ${isAdmin()}`)

    return (
        <div id='lprcup_episode_panel'>
            <div id="lces_real_selectors">
                {/* <LprCupEpisodeSelector
                    id="selector_0"
                    caption="Новости"
                    activeId={activeId}
                    activeIdUpdate={activeIdUpdate} /> */}
                {LprCupEpisodes({ count: params.episodesCount, activeId: activeId, activeIdUpdate: activeIdUpdate })}
            </div>
            <div className="lces_bottom_buttons">
                {isAdmin() ? <LprCupNewEpisode season={params.season} grade={params.grade}/> : <></>}
                <LprCupBack/>
            </div>
            
        </div>
    );
}



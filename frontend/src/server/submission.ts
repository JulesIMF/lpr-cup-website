
export class Submission {
    id: number;

    studentName: string;
    season: number;
    grade: number;
    episode: number;
    trial: number;

    checked: boolean;
    verdict: Map<string, "n" | "m" | "c" | "p" | "i">;
    constructor(id: number, studentName: string, season: number, grade: number, episode: number, trial: number, checked: boolean, verdict: Map<string, "n" | "m" | "c" | "p" | "i">) {
        this.id = id;
        this.studentName = studentName;
        this.season = season;
        this.grade = grade;
        this.episode = episode;
        this.episode = episode;
        this.trial = trial;
        this.checked = checked;
        this.verdict = verdict;
    }

    private clone() {
        var copy: Submission = new Submission(
            this.id,
            this.studentName,
            this.season,
            this.grade,
            this.episode,
            this.trial,
            this.checked,
            this.verdict
        );

        return copy;
    }

    public nextVerdict(task: string): Submission {
        // var copy: Submission = deepCopy(this);
        var copy: Submission = this.clone();

        var current = this.verdict.get(task);
        if (current == "n") {
            copy.verdict.set(task, "c");
        } else {
            var options = [
                'c',
                'p',
                'i',
                'm'
            ];

            var index = options.lastIndexOf(current as ("n" | "m" | "c" | "p" | "i"));
            var newVerdict = options.at((index + 1) % options.length) as ("n" | "m" | "c" | "p" | "i");
            copy.verdict.set(task, newVerdict);
        }

        return copy;
    }

    public isCheckCompleted() {
        for (var x of this.verdict.values()) {
            if (x == 'n') {
                return false;
            }
        }

        return true;
    }

    public setChecked(newChecked: boolean = true) {
        var clone = this.clone();
        clone.checked = newChecked;
        return clone;
    }
}

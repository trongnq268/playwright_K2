export class ContactFormModel{
    constructor (
        private _name: string,
        private _email: string,
        private _phone: string,
        private _subject: string,
        private _description: string,
    ){};
    getName(): string{
        return this._name;
    };
    getEmail(): string{
        return this._email;
    };
    getPhone(): string{
        return this._phone;
    };
    getSubject(): string{
        return this._subject;
    };
    getDescription(): string{
        return this._description;
    };
    getValidate(): {isValid: boolean; errors: string[]} {
        const error: string[] = [];
        if (!this._name.trim()){
            error.push('Name may not be blank');
        }
        if(!this._email.trim()){
            error.push('Email may not be blank');
        }
        if(!this._phone.trim()){
            error.push('Phone may not be blank');
        }
        if(!this._subject.trim()){
            error.push('Subject may not be blank');
        }
        if(!this._description.trim()){
            error.push('Description is required');
        }
        return {
            isValid: error.length === 0,
            errors: [],
        }
    }
    toPayload(): object {
        return {
            name: this._name,
            email: this._email,
            phone: this._phone,
            subject: this._subject,
            description: this._description,
        }
    }


}
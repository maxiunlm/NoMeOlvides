using Domain.ViewModel;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DataModel
{
    public class ContactDataModel
    {
        private ObjectId id = ObjectId.Empty;
        [BsonId]
        public ObjectId Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }

        private string alias;
        public string Alias
        {
            get
            {
                if (string.IsNullOrWhiteSpace(alias))
                {
                    alias = string.Empty;
                }

                return alias;
            }
            set
            {
                alias = value;
            }
        }

        private string name;
        public string Name
        {
            get
            {
                if (string.IsNullOrWhiteSpace(name))
                {
                    name = string.Empty;
                }

                return name;
            }
            set
            {
                name = value;
            }
        }

        private string surname;
        public string Surname
        {
            get
            {
                if (string.IsNullOrWhiteSpace(surname))
                {
                    surname = string.Empty;
                }

                return surname;
            }
            set
            {
                surname = value;
            }
        }

        private string email;
        [BsonRequired]
        public string Email
        {
            get
            {
                if (string.IsNullOrWhiteSpace(email))
                {
                    email = string.Empty;
                }

                return email;
            }
            set
            {
                email = value;
            }
        }

        private string phone;
        public string Phone
        {
            get
            {
                if (string.IsNullOrWhiteSpace(phone))
                {
                    phone = string.Empty;
                }

                return phone;
            }
            set
            {
                phone = value;
            }
        }

        private string cellphone;
        public string Cellphone
        {
            get
            {
                if (string.IsNullOrWhiteSpace(cellphone))
                {
                    cellphone = string.Empty;
                }

                return cellphone;
            }
            set
            {
                cellphone = value;
            }
        }

        private string address;
        public string Address
        {
            get
            {
                if (string.IsNullOrWhiteSpace(address))
                {
                    address = string.Empty;
                }

                return address;
            }
            set
            {
                address = value;
            }
        }

        private string password;
        [BsonRequired]
        public string Password
        {
            get
            {
                if (string.IsNullOrWhiteSpace(password))
                {
                    password = string.Empty;
                }

                return password;
            }
            set
            {
                password = value;
            }
        }

        private List<ObjectId> contacts;
        public List<ObjectId> Contacts
        {
            get
            {
                if (contacts == null)
                {
                    contacts = new List<ObjectId>();
                }

                return contacts;
            }
            set { contacts = value; }
        }

        public ContactDataModel() { }
        public ContactDataModel(ContactViewModel contactViewModel)
        {
            if (IsAnExistentId(contactViewModel))
            {
                this.Id = new ObjectId(contactViewModel.Id);
            }

            this.Alias = contactViewModel.Alias;
            this.Name = contactViewModel.Name;
            this.Surname = contactViewModel.Surname;
            this.Email = contactViewModel.Email;
            this.Phone = contactViewModel.Phone;
            this.Cellphone = contactViewModel.Cellphone;
            this.Address = contactViewModel.Address;
            this.Password = contactViewModel.Password;

            contactViewModel.Contacts.ForEach(o => this.Contacts.Add(new ObjectId(o)));
        }

        private bool IsAnExistentId(ContactViewModel contactViewModel)
        {
            return !string.IsNullOrWhiteSpace(contactViewModel.Id);
        }
    }
}

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
        [BsonId]
        public ObjectId Id { get; set; }
        public string Alias { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        [BsonRequired]
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Cellphone { get; set; }
        public string Address { get; set; }
        [BsonRequired]
        public string Password { get; set; }
        private List<ObjectId> contacts;
        public List<ObjectId> Contacts
        {
            get
            {
                if(contacts == null)
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

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SocialMedia.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        public int? PostId { get; set; }
        public virtual Post Post { get; set; }
        

        [Required]
        [Display(Name = "Content")]
        [MinLength(1, ErrorMessage = "Min Lenght 1 Character")]
        public string content { get; set; }

        [Required]
        [Display(Name = "Author")]
        public string author { get; set; }

        [Required]
        [Display(Name = "Likes Count")]
        public int likes { get; set; }

        [Required]
        public DateTime datetime { get; set; }

        [MaxLength]
        public byte[] AttachedImage1 { get; set; }

        public Comment()
        {
            //DEFAULT VALUES
            author = "Unknown";
            likes = 0;
            datetime = DateTime.Now;
        }
    }
}